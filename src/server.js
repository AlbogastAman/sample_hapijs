'use strict';

const Hapi = require('hapi');
const HapiOpenAPI = require('hapi-openapi');
const Path = require('path');

require('dotenv').config();

///////////////////////////////////////////////////////////////////////////////
// Pre-route-handler middleware
///////////////////////////////////////////////////////////////////////////////
//https://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
//const selfSignedAgent = new https.Agent({ rejectUnauthorized: false });
// const selfSignedAgent = new https.Agent({
//     rejectUnauthorized: process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0
// });

const init = async () => {
    const server = new Hapi.Server({
        port: 3006,
        host: 'localhost',
        // If your cookie format is not RFC 6265, set this param to false.
        state: {
            strictHeader: false
        },
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['x-token-token', 'token', 'authorization', 'transfer-status', 'transaction-type', 'from-date', 'to-date']
            },
            validate: {
                failAction: async (request, h, err) => {

                    console.log('payload ',request.payload)

                    if (process.env.NODE_ENV === 'production') {
                        // In prod, log a limited error message and throw the default Bad Request error.
                        console.error('ValidationError:', err.message);
                        throw Boom.badRequest(`Invalid request payload input`);
                    } else {
                        // During development, log and respond with the full error.
                        console.error(err);
                        throw err;
                    }
                }
            }
        }

    });

    await server.register({
        plugin: HapiOpenAPI,
        options: {
            api: Path.resolve('./config/swagger.json'),
            handlers: Path.resolve('./src/handlers')
        }
    });

    await server.start();

    return server;
};


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init().then((server) => {
    server.plugins.openapi.setHost(server.info.host + ':' + server.info.port);
    // server.ext('onRequest', onRequest);
    server.log(['info'], `Server running on ${server.info.host}:${server.info.port}`);
    console.log(`Server running on ${server.info.host}:${server.info.port}`);
});
