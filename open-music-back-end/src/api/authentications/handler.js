const autoBind = require("auto-bind");

class AuthenticationsHandler {
    constructor(authenticationsService, usersService, tokenManager, validator) {
        this._authenticationsService = authenticationsService;
        this._usersService = usersService,
        this._tokenManager = tokenManager,
        this._validator = validator,

        autoBind(this);
    }

    async postAuthenticationsHandler(request, h) {
        this._validator.validatePostAuthenticationPayload(request.payload);

        const { username, password } = request.payload;
        const id = await this._usersService.verifyUserCredential(username, password);

        const accessToken = this._tokenManager.generateAccessToken({ id });
        const refreshToken = this._tokenManager.generateRefreshToken({ id });

        await this._authenticationsService.addRefreshToken(refreshToken);

        return h
            .response({
                status: 'success',
                message: 'Authentication added successfully',
                data: {
                    accessToken,
                    refreshToken,
                },
            })
            .code(201);
    }

    async putAuthenticationsHandler(request, h) {
        this._validator.validatePutAuthenticationPayload(request.payload);

        const { refreshToken } = request.payload;
        await this._authenticationsService.verifyRefreshToken(refreshToken);
        const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

        const accessToken = this._tokenManager.generateAccessToken({ id });
        return h
            .response({
                status: 'success',
                message: 'Access Token updated successfully',
                data: {
                    accessToken,
                },
            })
            .code(200);
    }

    async deleteAuthenticationsHandler(request, h) {
        this._validator.validateDeleteAuthenticationPayload(request.payload);

        const { refreshToken } = request.payload;
        await this._authenticationsService.verifyRefreshToken(refreshToken);
        await this._authenticationsService.deleteRefreshToken(refreshToken);

        return h
            .response({
                status: 'success',
                message: 'Access Token deleted successfully',
            })
            .code(200);
    }
}

module.exports = AuthenticationsHandler;
