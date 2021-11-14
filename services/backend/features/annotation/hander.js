const { annotationForm } = require("../../core/db/models");
const { StatusCodes } = require("http-status-codes");

class Handler {
  async getAnnotationsForMeme(req, res) {
    try {
      const { collectionId, memeId } = req.params;
      console.log({ collectionId, memeId });
      // const annotationFormRes = await annotationForm.getAnnotationForm(
      //   collectionId
      // );
      // res.json(annotationFormRes);
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not getAnnotationForm" });
    }
  }

  async createAnnotation(req, res) {
    try {
      const { collectionId, memeId } = req.params;
      const { annotations } = req.body;
      console.log({ collectionId, memeId, annotations });
      // const annotationFormRes = await annotationForm.getAnnotationForm(
      //   collectionId
      // );

      // res.json(annotationFormRes);
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not getAnnotationForm" });
    }
  }

  async saveAnnotations(req, res) {
    console.log("here");
  }
}

module.exports = Handler;
