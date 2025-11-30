const { nanoid } = require('nanoid');
const { Pool } = require('pg');

const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class LikesService {
    constructor(cacheService) {
        this._pool = new Pool();
        this._cacheService = cacheService;
    }

    async likeAlbum({ userId, albumId }) {
        const id = nanoid(16);

        const result = await this._pool.query({
            text: `
                INSERT INTO user_album_likes (id, user_id, album_id)
                VALUES ($1, $2, $3)
                ON CONFLICT (user_id, album_id) DO NOTHING
                RETURNING id
            `,
            values: [id, userId, albumId],
        });

        if (!result.rows.length) {
            throw new InvariantError('You already liked this album');
        }

        await this._cacheService.delete(`likes:${albumId}`);
        return result.rows[0].id;
    }

    async unlikeAlbum({ userId, albumId }) {
        const result = await this._pool.query({
            text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
            values: [userId, albumId],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Failed to unlike the album');
        }

        await this._cacheService.delete(`likes:${albumId}`);
    }

    async getLikesAlbum(albumId) {
        try {
            const result = await this._cacheService.get(`likes:${albumId}`);
            return {
                likes: JSON.parse(result),
                source: 'cache',
            };
        } catch (error) {
            const result = await this._pool.query({
                text: `
                    SELECT COUNT(*) AS likes
                    FROM user_album_likes
                    WHERE album_id = $1
                `,
                values: [albumId],
            });

            const likes = Number(result.rows[0].likes);

            await this._cacheService.set(`likes:${albumId}`, JSON.stringify(likes));

            return {
                likes,
                source: 'database',
            };
        }
    }
}

module.exports = LikesService;
