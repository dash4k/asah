const autoBind = require("auto-bind");

class ExportsHandler {
    constructor(playlistsService, producerService, validator) {
        this._playlistsService = playlistsService;
        this._producerService = producerService;
        this._validator = validator;

        autoBind(this);
    }

    async postExportPlaylistHandler(request, h) {
        this._validator.validateExportPlaylistPayload(request.payload);
        const { id: credentialId } = request.auth.credentials;
        const { playlistId } = request.params;

        await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

        const message = {
            playlistId,
            targetEmail: request.payload.targetEmail,
        }

        await this._producerService.sendMessage('export:playlist', JSON.stringify(message));

        return h
            .response({
                status: 'success',
                message: 'Your request is on the queues',
            })
            .code(201);
    }
}

module.exports = ExportsHandler;
