const { Handler } = require("./handler");
const 

class Controller {
  constructor() {
    this.handler = new Handler();
  }

  get configuration() {
    return [
      {
        path: "/auth/signup",
        method: "post",
        handler: this.handler.signUpNewUser,
      },
      {
        path: "/auth/email-verification",
        method: "get",
        handler: this.handler.verifyEmail,
      },
      {
        path: "/auth/login",
        method: "post",
        handler: this.handler.loginUser,
      },
      {
        path: "/auth/refresh-token",
        method: "post",
        handler: this.handler.refreshToken,
      },
      {
        path: "/auth/logoutUser",
        method: "delete",
        handler: this.handler.getHealth,
      },
    ];
  }
}

const health = new Controller();

module.exports = {
  health,
};
