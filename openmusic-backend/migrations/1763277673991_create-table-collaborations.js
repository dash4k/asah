/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('collaborations', {
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
        user_id: {
            type: 'VARCHAR(50)',
            references: '"users"(id)',
            onDelete: 'CASCADE',
            notNull: true,
        },
    });

    pgm.createConstraint(
        'collaborations', 
        'unique_playlist_id_and_user_id', 
        'UNIQUE(playlist_id, user_id)',
    );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
