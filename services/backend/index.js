const { Server } = require("./core/server");
const { health, meme } = require("./features");

server = new Server(3000);
server.configureMiddlewares();

server.setFeatures([health, meme]);

server.start();
