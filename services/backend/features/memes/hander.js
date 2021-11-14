const { meme, collection } = require("../../core/db/models");
const { StatusCodes } = require("http-status-codes");

class Handler {
  async createMeme(req, res) {
    try {
      const { url, platform, contentType, preview, storeURL, title } = req.body;
      const { user } = req;
      const newMeme = await meme.createByURL(
        url,
        user,
        title,
        platform,
        contentType,
        preview,
        storeURL
      );

      res.json(newMeme);
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not create meme" });
    }
  }

  async get(req, res) {
    try {
      const { page } = req.query;
      console.log(page);
      const memesAndCount = await meme.get(page);
      res.json({ ...memesAndCount });
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not get memes" });
    }
  }

  async getMemesByUserId(req, res) {
    try {
      const { userId } = req.params;
      let { page } = req.query;
      page = page ? page : 0;
      const memesAndCount = await meme.getMemesByUserId(userId, page);
      res.json({ ...memesAndCount });
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not get memes" });
    }
  }

  async getMemesByCollectionId(req, res) {
    try {
      const { collectionId } = req.params;
      let { page } = req.query;
      page = page ? page : 0;
      const memesAndCount = await collection.getMemesByCollectionId(
        collectionId,
        page
      );
      res.json({ ...memesAndCount });
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "Could not get memes" });
    }
  }
}

module.exports = Handler;
