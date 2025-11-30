const autoBind = require("auto-bind");

class PlaylistsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async postPlaylistHandler(request, h) {
        this._validator.validatePostPlaylistPayload(request.payload);
        const { name } = request.payload;
        const { id: credentialId } = request.auth.credentials;

        const playlistId = await this._service.addPlaylist({ name, owner: credentialId });

        return h
            .response({
                status: 'success',
                message: 'Playlist created successfully',
                data: {
                    playlistId,
                },
            })
            .code(201);
    }

    async getPlaylistsHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const playlists = await this._service.getPlaylist(credentialId);

        return h
            .response({
                status: 'success',
                message: 'Playlists Retrieved Successfully',
                data: {
                    playlists,
                },
            })
            .code(200);
    }

    async deletePlaylistHandler(request, h) {
        const { id } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._service.verifyPlaylistOwner(id, credentialId);
        await this._service.deletePlaylistById(id);

        return h
            .response({
                status: 'success',
                message: 'Playlist deleted successfully',
            })
            .code(200);
    }

    async postPlaylistSongHandler(request, h) {
        this._validator.validatePostPlaylistSongPayload(request.payload);
        const { songId } = request.payload;
        const { id: playlistId} = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._service.verifyPlaylistAccess(playlistId, credentialId);
        const id = await this._service.addPlaylistSong({ songId, playlistId });
        await this._service.addPlaylistSongActivity({ playlistId, songId, userId: credentialId, action: 'add'});

        return h
            .response({
                status: 'success',
                message: 'Song added successfully',
                data: {
                    id,
                },
            })
            .code(201);
    }

    async getPlaylistSongsHandler(request, h) {
        const { id: playlistId } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._service.verifyPlaylistAccess(playlistId, credentialId);

        const { name, username } = await this._service.getPlaylistById(playlistId);
        const songs = await this._service.getPlaylistSongsById(playlistId);
        
        return h
            .response({
                status: 'success',
                data: {
                    playlist: {
                        id: playlistId,
                        name,
                        username,
                        songs,
                    },
                },
            })
            .code(200);
    }

    async deletePlaylistSongHandler(request, h) {
        this._validator.validateDeletePlaylistSongPayload(request.payload);
        const { songId } = request.payload;
        const { id: playlistId } = request.params;
        const { id: credentialId } = request.auth.credentials

        await this._service.verifyPlaylistAccess(playlistId, credentialId);
        await this._service.deletePlaylistSongById({ songId, playlistId });
        await this._service.addPlaylistSongActivity({ playlistId, songId, userId: credentialId, action: 'delete'});

        return h
            .response({
                status: 'success',
                message: 'Song deleted successfully',
            })
            .code(200);
    }

    async getPlaylistSongActivitiesHandler(request, h) {
        const { id: playlistId } = request.params;
        const { id: credentialId } = request.auth.credentials

        await this._service.verifyPlaylistAccess(playlistId, credentialId);
        
        const { activities, source } = await this._service.getPlaylistSongActivities(playlistId);

        const response = h
            .response({
                status: 'success',
                data: {
                    playlistId,
                    activities,
                },
            })
            .code(200);

        if (source === 'cache') {
            response.header('X-Data-Source', 'cache');
        }

        return response;
    }
}

module.exports = PlaylistsHandler;
