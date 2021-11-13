const express = require("express");
const cors = require("cors");

class Server {
  constructor(port) {
    this.port = port;
    this.express = express();
  }

  configureMiddlewares() {
    this.expressApp.use(
      cors({
        origin: "*",
      })
    );

    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
  }

  start() {
    this.express.listen(this.port, () => {
      console.log(`Server is listening on port : ${this.port}`);
    });
  }

  setFeatures(features) {
    this.express.get("/", (req, res) => {
      res.send("hi");
    });
    features.map((feature) => {
      const config = feature.configuration;
      config.map((conf) => {
        switch (conf.method) {
          case "get":
            this.express.get(conf.path, conf.handler);
            break;
          case "post":
            this.express.get(conf.path, conf.handler);
          default:
        }
      });
    });
  }
}

module.exports = {
  Server,
};
