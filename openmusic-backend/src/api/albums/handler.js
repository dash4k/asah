const autoBind = require('auto-bind');

class AlbumsHandler {
    constructor(albumsService, likesService, storageService, validator) {
        this._albumsService = albumsService;
        this._likesService = likesService;
        this._storageService = storageService;
        this._validator = validator;

        autoBind(this);
    }

    async postAlbumHandler(request, h) {
        this._validator.validateAlbumPayload(request.payload);
        const { name, year } = request.payload;

        const albumId = await this._albumsService.addAlbum({ name, year });

        return h
            .response({
                status: 'success',
                message: 'Album saved successfully',
                data: {
                    albumId,
                }
            })
            .code(201);
    }

    async getAlbumByIdHandler(request, h) {
        const { id } = request.params;
        const album = await this._albumsService.getAlbumById(id);

        return h
            .response({
                status: 'success',
                data: {
                    album,
                },
            })
            .code(200);
    }

    async putAlbumByIdHandler(request, h) {
        this._validator.validateAlbumPayload(request.payload);
        const { id } = request.params;

        await this._albumsService.editAlbumById(id, request.payload);

        return h
            .response({
                status: 'success',
                message: 'Album updated successfully',
            })
            .code(200);
    }

    async deleteAlbumByIdHandler(request, h) {
        const { id } = request.params;
        await this._albumsService.deleteAlbumById(id);

        return h
            .response({
                status: 'success',
                message: 'Album deleted successfully',
            })
            .code(200);
    }

    async postCoverAlbumByIdHandler(request, h) {
        const { id } = request.params;
        const { cover } = request.payload;
        this._validator.validateCoverHeaders(cover.hapi.headers);

        await this._albumsService.verifyAlbumExist(id);

        const filename = await this._storageService.writeFile(cover, cover.hapi);

        const filePath = `http://${process.env.HOST}:${process.env.PORT}/uploads/covers/${filename}`;

        await this._albumsService.updateAlbumCover(filePath, id);
        
        return h
            .response({
                status: 'success',
                message: 'Sampul berhasil diunggah',
            })
            .code(201);
    }

    async postLikeAlbumByIdHandler(request, h) {
        const { id: albumId } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._albumsService.verifyAlbumExist(albumId);
        
        const likesId = await this._likesService.likeAlbum({ userId: credentialId, albumId});

        return h
            .response({
                status: 'success',
                message: 'Album liked successfully',
                data: {
                    id: likesId,
                },
            })
            .code(201);
    }

    async deleteLikeAlbumByIdHandler(request, h) {
        const { id: albumId } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._albumsService.verifyAlbumExist(albumId);
        await this._likesService.unlikeAlbum({ userId: credentialId, albumId});

        return h
            .response({
                status: 'success',
                message: 'Album unliked successfully',
            })
            .code(200);
    }

    async getLikesAlbumByIdHandler(request, h) {
        const { id: albumId } = request.params;

        await this._albumsService.verifyAlbumExist(albumId);
        
        const { likes, source } = await this._likesService.getLikesAlbum(albumId);

        const response = h
            .response({
                status: 'success',
                data: {
                    likes
                },
            })
            .code(200);

        if (source === 'cache') {
            response.header('X-Data-Source', 'cache');
        }

        return response;
    }
}

module.exports = AlbumsHandler;
