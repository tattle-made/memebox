const { meme, collection } = require("../../core/db/models");
const { StatusCodes } = require("http-status-codes");
const axios = require("axios");
const config = require("../../config");

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

  async createMemeFromBookmark(req, res) {
    try {
      const { url, title } = req.body;
      console.log({ url, title });
      const scrapedMeme = await axios.get(
        `${config.processor_api_url}/scrape?url=${url}`
      );

      console.log(scrapedMeme.data);

      res.send({ scraped_post: scrapedMeme.data });
      // http://localhost:5000/scrape?url=https://www.instagram.com/reel/CVKobtmgTST/
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
