const autoBind = require("auto-bind");

class CollaborationsHandler {
    constructor(collaborationsService, playlistsService, usersService, validator) {
        this._collaborationsService = collaborationsService;
        this._playlistsService = playlistsService;
        this._usersService = usersService;
        this._validator = validator;

        autoBind(this);
    }

    async postCollaborationHandler(request, h) {
        this._validator.validatePostCollaboratorPayload(request.payload);
        const { playlistId, userId } = request.payload;
        const { id: credentialId } = request.auth.credentials;

        await this._usersService.verifyUserExist(userId);
        await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
        const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId);

        return h
            .response({
                status: 'success',
                message: 'Collaboration added successfully',
                data: {
                    collaborationId,
                },
            })
            .code(201);
    }

    async deleteCollaborationHandler(request, h) {
        this._validator.validateDeleteCollaboratorPayload(request.payload);
        const { playlistId, userId } = request.payload;
        const { id: credentialId } = request.auth.credentials;

        await this._usersService.verifyUserExist(userId);
        await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
        const collaborationId = await this._collaborationsService.deleteCollaboration(playlistId, userId);

        return h
            .response({
                status: 'success',
                message: 'Collaboration deleted successfully',
                data: {
                    collaborationId,
                }
            })
            .code(200);
    }
}

module.exports = CollaborationsHandler;
