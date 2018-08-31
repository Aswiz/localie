'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
	port: 3000,
	host: 'localhost'
});

const init = async () => {

	await server.register(require('inert'));

	server.route({
		method: 'GET',
		path: '/',
		handler: (request, h) => {
			return h.file('./public/index.html');
		}
	});
	server.route({
		method: 'GET',
		path: '/api',
		handler: (request, h) => {
			return { "text": "foo" };
		}
	});
	server.route({
		method: 'GET',
		path: '/public/{name}',
		handler: (request, h) => {
			return h.file('./public/' + encodeURIComponent(request.params.name));
		}
	});

	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();