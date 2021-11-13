const { api_version } = require("../config");

class Handler {
  getHealth(req, res) {
    res.send({ api_version, health: "ok" });
  }
}

class Controller {
  constructor() {
    this.handler = new Handler();
  }

  get configuration() {
    return [
      {
        path: "/health",
        method: "get",
        handler: this.handler.getHealth,
      },
    ];
  }
}

const health = new Controller();

module.exports = {
  health,
};
