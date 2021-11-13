const { Server } = require("./core/server");
const { health } = require("./features/health");

server = new Server(3000);

server.setFeatures([health]);

server.start();
