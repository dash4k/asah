// 3rd party api
const { nanoid } = require("nanoid");
const { Pool } = require("pg");

// utils
const { mapToDBPlaylist } = require("../../utils");

// exceptions
const AuthorizationError = require("../../exceptions/AuthorizationError");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class PlaylistsService {
    constructor(cacheService, collaborationsService, songsService) {
        this._pool = new Pool();
        this._cacheService = cacheService;
        this._collaborationsService = collaborationsService;
        this._songsService = songsService;
    }

    async addPlaylist({ name, owner }) {
        const id = nanoid(16);
        
        const result = await this._pool.query({
            text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
            values: [id, name, owner],
        });

        if (!result.rows.length) {
            throw new InvariantError('Failed to create playlist');
        }

        return result.rows[0].id;
    }

    async getPlaylist(owner) {
        const result = await this._pool.query({
            text: `(
                SELECT 
                    playlists.id, 
                    playlists.name, 
                    users.username
                FROM playlists
                JOIN users ON users.id = playlists.owner
                WHERE playlists.owner = $1
            )
            UNION
            (
                SELECT 
                    playlists.id, 
                    playlists.name, 
                    users.username
                FROM playlists
                JOIN collaborations ON collaborations.playlist_id = playlists.id
                JOIN users ON users.id = playlists.owner
                WHERE collaborations.user_id = $1
            );`,
            values: [owner],
        });

        return result.rows;
    }

    async getPlaylistById(id) {
        const result = await this._pool.query({
            text: `
                SELECT 
                    playlists.id, 
                    playlists.name, 
                    users.username
                FROM playlists
                JOIN users ON playlists.owner = users.id
                WHERE playlists.id = $1
            `,
            values: [id],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Playlist not found');
        }

        return {
            id: result.rows[0].id,
            name: result.rows[0].name,
            username: result.rows[0].username,
        };
    }

    async deletePlaylistById(id) {
        const result = await this._pool.query({
            text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
            values: [id],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Failed while trying to delete playlist. Playlist not found');
        }
    }

    async addPlaylistSong({ songId, playlistId }) {
        const id = nanoid(16);

        await this._songsService.getSongById(songId);

        const result = await this._pool.query({
            text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, songId],
        });

        if (!result.rows.length) {
            throw new InvariantError('Failed to add the song to the playlist');
        }

        return result.rows[0].id;
    }

    async getPlaylistSongsById(id) {
        const result = await this._pool.query({
            text: `
            SELECT 
                songs.id, 
                songs.title, 
                songs.performer
            FROM playlist_songs
            JOIN songs ON songs.id = playlist_songs.song_id
            WHERE playlist_songs.playlist_id = $1;
            `,
            values: [id],
        });

        return result.rows;
    }

    async deletePlaylistSongById({ songId, playlistId }) {
        const result = await this._pool.query({
            text: 'DELETE FROM playlist_songs WHERE song_id = $1 AND playlist_id = $2 RETURNING id',
            values: [songId, playlistId],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Failed while trying to delete the song from the playlist. Song/Playlist not found.');
        }
    }

    async addPlaylistSongActivity({ playlistId, songId, userId, action }) {
        const id = nanoid(16);
        const time = new Date().toISOString();

        const result = await this._pool.query({
            text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, playlistId, songId, userId, action, time],
        });

        if (!result.rows.length) {
            throw new InvariantError('Failed to add new playlist song activity');
        }

        await this._cacheService.delete(`activities:${playlistId}`);
    }

    async getPlaylistSongActivities(playlistId) {
        try {
            const result = await this._cacheService.get(`activities:${playlistId}`);
            return {
                activities: JSON.parse(result.rows),
                source: 'cache',
            };
        } catch (error) {
            const result = await this._pool.query({
                text: `SELECT 
                        users.username,
                        songs.title,
                        playlist_song_activities.action,
                        playlist_song_activities.time
                    FROM playlist_song_activities
                    JOIN users ON users.id = playlist_song_activities.user_id
                    JOIN songs ON songs.id = playlist_song_activities.song_id
                    WHERE playlist_song_activities.playlist_id = $1
                    ORDER BY playlist_song_activities.time ASC;
                `,
                values: [playlistId],
            });

            const activities = result.rows;

            await this._cacheService.set(`activities:${playlistId}`, JSON.stringify(activities));

            return {
                activities,
                source: 'database',
            };
        }
    }

    async verifyPlaylistOwner(id, owner) {
        const result = await this._pool.query({
            text: 'SELECT * FROM playlists WHERE id = $1',
            values: [id],
        });

        if (!result.rows.length) {
            throw new NotFoundError('Playlist not found');
        }

        const playlist = result.rows[0];
        if (playlist.owner !== owner) {
            throw new AuthorizationError('Unauthorized access');
        }
    }

    async verifyPlaylistAccess(playlistId, userId) {
        try {
            await this.verifyPlaylistOwner(playlistId, userId);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            try {
                await this._collaborationsService.verifyCollaborator(playlistId, userId);
            } catch {
                throw error;
            }
        }
    }
}

module.exports = PlaylistsService;
