const Handler = require("./hander");

class Controller {
  constructor() {
    this.handler = new Handler();
  }

  get configuration() {
    return [
      {
        path: "/annotations/collection/:collectionId/meme/:memeId",
        method: "get",
        handler: this.handler.getAnnotationsForMeme,
      },
      {
        path: "/annotations/collection/:collectionId/meme/:memeId",
        method: "post",
        handler: this.handler.saveAnnotations,
      },
    ];
  }
}

const annotation = new Controller();

module.exports = {
  annotation,
};
