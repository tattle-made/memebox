const { annotationForm } = require("../../core/db/models");
const { StatusCodes } = require("http-status-codes");

class Handler {
  async getAnnotationForm(req, res) {
    try {
      const { collectionId } = req.params;
      const annotationFormRes = await annotationForm.getAnnotationForm(
        collectionId
      );

      res.json(annotationFormRes);
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not getAnnotationForm" });
    }
  }
}

module.exports = Handler;
