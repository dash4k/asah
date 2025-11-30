/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('playlist_song_activities', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        playlist_id: {
            type: 'VARCHAR(50)',
            references: '"playlists"(id)',
            onDelete: 'CASCADE',
            notNull: true,
        },
        song_id: {
            type: 'VARCHAR(50)',
            references: '"songs"(id)',
            onDelete: 'CASCADE',
            notNull: true,
        },
        user_id: {
            type: 'VARCHAR(50)',
            references: '"users"(id)',
            onDelete: 'CASCADE',
            notNull: true,
        },
        action: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        time: {
            type: 'TEXT',
            notNull: true,
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('playlist_song_activities');
};
