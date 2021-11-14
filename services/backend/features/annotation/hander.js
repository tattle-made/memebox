const { annotation } = require("../../core/db/models");
const dbModels = require("../../core/db/models");
const { StatusCodes } = require("http-status-codes");

class Handler {
  async getAnnotationsForMeme(req, res) {
    try {
      const { collectionId, memeId } = req.params;
      console.log({ collectionId, memeId });
      const annotations = await annotation.getAnnotations(collectionId, memeId);
      // const annotationFormRes = await annotationForm.getAnnotationForm(
      //   collectionId
      // );
      res.json({ annotations });
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not getAnnotationForm" });
    }
  }

  async saveAnnotations(req, res) {
    try {
      const { collectionId, memeId } = req.params;
      const { user } = req;
      const { annotations } = req.body;
      await annotation.saveAnnotations(user, collectionId, memeId, annotations);

      res.json({ message: "annotations saved" });
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not getAnnotationForm" });
    }
  }
}

module.exports = Handler;
