// 3rd party api
const { nanoid } = require('nanoid');
const { Pool } = require('pg');

// exceptions
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapToDBAlbum, mapToDBSong } = require('../../utils');

class AlbumsService {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const id = nanoid(16);

        const result = await this._pool.query({
            text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
            values: [id, name, year],
        });

        if (!result.rows[0].id) {
            throw new InvariantError('Failed to add album');
        }

        return result.rows[0].id;
    }

    async getAlbumById(id) {
        const result = await this._pool.query({
            text: 'SELECT * FROM albums WHERE id = $1',
            values: [id],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Album not found');
        }

        const album = result.rows.map(mapToDBAlbum)[0];

        const songs = await this._pool.query({
            text: 'SELECT * FROM songs WHERE album_id = $1',
            values: [id],
        });

        album.songs = songs.rows.map(mapToDBSong);
        
        return album;
    }

    async editAlbumById(id, { name, year }) {
        const result = await this._pool.query({
            text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
            values: [name, year, id],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Failed to update the album. Album not found');
        }
    }

    async deleteAlbumById(id) {
        const result = await this._pool.query({
            text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
            values: [id],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Failed to delete the album. Album not found');
        }
    }
}

module.exports = AlbumsService;