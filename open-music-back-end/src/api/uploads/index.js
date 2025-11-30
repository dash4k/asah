const path = require('path');

module.exports = {
    name: 'uploads',
    version: '1.0.0',
    register: async (server) => {
        server.route(
            {
                method: 'GET',
                path: '/uploads/{param*}',
                handler: {
                    directory: {
                        path: path.resolve(__dirname, '../uploads'),
                    },
                },
            },
        );
    },
};
