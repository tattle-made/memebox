const Handler = require("./hander");

class Controller {
  constructor() {
    this.handler = new Handler();
  }

  get configuration() {
    return [
      {
        path: "/memes",
        method: "post",
        handler: this.handler.createMeme,
      },
      {
        path: "/memes/bookmark",
        method: "post",
        handler: this.handler.createMemeFromBookmark,
      },
      {
        path: "/memes",
        method: "get",
        handler: this.handler.get,
      },
      {
        path: "/memes/user/:userId",
        method: "get",
        handler: this.handler.getMemesByUserId,
      },
      {
        path: "/memes/collection/:collectionId",
        method: "get",
        handler: this.handler.getMemesByCollectionId,
      },
    ];
  }
}

const meme = new Controller();

module.exports = {
  meme,
};
