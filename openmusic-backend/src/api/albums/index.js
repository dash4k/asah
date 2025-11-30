const AlbumsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'albums',
    version: '1.0.0',
    register: async (server, { albumsService, likesService, storageService, validator }) => {
        const albumsHandler = new AlbumsHandler(albumsService, likesService, storageService, validator);
        server.route(routes(albumsHandler));
    },
};
