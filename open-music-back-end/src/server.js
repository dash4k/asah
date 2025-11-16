require('dotenv').config();

// 3rd party api
const Hapi = require('@hapi/hapi');

// local api
const albums = require('./api/albums');
const songs = require('./api/songs');

// services
const AlbumsService = require('./services/postgres/AlbumsService');
const SongsService = require('./services/postgres/SongsService');

// validators
const AlbumsValidator = require('./validator/albums/index');
const SongsValidator = require('./validator/songs/index');

// exceptions
const ClientError = require('./exceptions/ClientError');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: albums,
            options: {
                service: albumsService,
                validator: AlbumsValidator,
            },
        },
        {
            plugin: songs,
            options: {
                service: songsService,
                validator: SongsValidator,
            },
        },
    ]);

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;

        if (response instanceof ClientError) {
            return h
                .response({
                    status: 'fail',
                    message: response.message,
                })
                .code(response.statusCode);
        }

        console.log(response);
        return h.continue;
    });

    await server.start();
    console.log(`Server is running at ${server.info.uri}`);
};

init();
