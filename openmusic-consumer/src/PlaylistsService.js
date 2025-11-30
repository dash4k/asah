const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
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

        return {
            id: result.rows[0].id,
            name: result.rows[0].name,
            username: result.rows[0].username,
        };
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
}

module.exports = PlaylistsService;
