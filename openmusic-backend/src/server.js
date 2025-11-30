// 3rd party api
require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');

// local api
const albums = require('./api/albums');
const authentications = require('./api/authentications');
const collaborations = require('./api/collaborations')
const _exports = require('./api/exports');
const playlists = require('./api/playlists');
const songs = require('./api/songs');
const uploads = require('./api/uploads');
const users = require('./api/users');

// services
const AlbumsService = require('./services/postgres/AlbumsService');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const CacheService = require('./services/redis/CacheService');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const LikesService = require('./services/postgres/LikesService');
const PlaylistsService = require('./services/postgres/PlaylistsService');
const ProducerService = require('./services/rabbitmq/ProducerService');
const SongsService = require('./services/postgres/SongsService');
const StorageService = require('./services/storage/StorageService');
const UsersService = require('./services/postgres/UsersService');

// validators
const AlbumsValidator = require('./validator/albums/index');
const AuthenticationsValidator = require('./validator/authentications/index');
const CollaborationsValidator = require('./validator/collaborations/index');
const ExportsValidator = require('./validator/exports/index');
const PlaylistsValidator = require('./validator/playlists/index');
const SongsValidator = require('./validator/songs/index');
const UsersValidator = require('./validator/users/index');

// exceptions
const ClientError = require('./exceptions/ClientError');

// utils
const TokenManager = require('./tokenize/TokenManager');

const init = async () => {
    const albumsService = new AlbumsService();
    const authenticationsService = new AuthenticationsService();
    const cacheService = new CacheService();
    const collaborationsService = new CollaborationsService();
    const likesService = new LikesService(cacheService);
    const songsService = new SongsService();
    const usersService = new UsersService();
    const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/covers'));
    const playlistsService = new PlaylistsService(cacheService, collaborationsService, songsService);
    
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
            plugin: Jwt,
        },
        {
            plugin: Inert,
        },
    ]);

    server.auth.strategy('openmusic_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    });

    await server.register([
        {
            plugin: albums,
            options: {
                albumsService,
                likesService,
                storageService,
                validator: AlbumsValidator,
            },
        },
        {
            plugin: authentications,
            options: {
                authenticationsService,
                usersService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
        {
            plugin: collaborations,
            options: {
                collaborationsService,
                playlistsService,
                usersService,
                validator: CollaborationsValidator,
            },
        },
        {
            plugin: _exports,
            options: {
                playlistsService,
                producerService: ProducerService,
                validator: ExportsValidator,
            },
        },
        {
            plugin: playlists,
            options: {
                service: playlistsService,
                validator: PlaylistsValidator,
            },
        },
        {
            plugin: songs,
            options: {
                service: songsService,
                validator: SongsValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator,
            },
        },
        {
            plugin: uploads,
        }
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
