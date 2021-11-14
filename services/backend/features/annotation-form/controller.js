const Handler = require("./hander");

class Controller {
  constructor() {
    this.handler = new Handler();
  }

  get configuration() {
    return [
      {
        path: "/annotation-form/collection/:collectionId",
        method: "get",
        handler: this.handler.getAnnotationForm,
      },
    ];
  }
}

const annotationForm = new Controller();

module.exports = {
  annotationForm,
};
