// 3rd party api
const { nanoid } = require('nanoid');
const { Pool } = require('pg');

// utils
const { mapToDBSong } = require('../../utils/index');

// exceptions
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ title, year, performer, genre, duration, albumId }) {
        const songId = nanoid(16);

        const result = await this._pool.query({
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [songId, title, year, performer, genre, duration, albumId],
        });

        if (!result.rows[0].id) {
            throw new InvariantError('Failed to add song');
        }

        return result.rows[0].id;
    }

    async getSongs({ title, performer }) {
        let query = 'SELECT id, title, performer FROM songs';
        const values = [];
        const conditions = [];

        if (title) {
            conditions.push(`title ILIKE $${values.length + 1}`);
            values.push(`%${title}%`);
        }

        if (performer) {
            conditions.push(`performer ILIKE $${values.length + 1}`);
            values.push(`%${performer}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const result = await this._pool.query({ 
            text: query, 
            values,
        });

        return result.rows;
    }

    async getSongById(id) {
        const result = await this._pool.query({
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id],
        });

        console.log(id);

        if (!result.rows.length) {
            throw new NotFoundError('Song not found');
        }

        return result.rows.map(mapToDBSong)[0];
    }

    async editSongById(id, { title, year, performer, genre, duration, albumId }) {
        const result = await this._pool.query({
            text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
            values: [title, year, performer, genre, duration, albumId, id],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Failed to update the song. Song not found');
        }
    }

    async deleteSongById(id) {
        const result = await this._pool.query({
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
            values: [id],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Failed to delete the song. Song not found');
        }
    }
}

module.exports = SongsService
