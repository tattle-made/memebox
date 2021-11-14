const { Server } = require("./core/server");
const { health, meme, annotationForm, annotation } = require("./features");

server = new Server(3000);
server.configureMiddlewares();

server.setFeatures([health, meme, annotationForm, annotation]);

server.start();
