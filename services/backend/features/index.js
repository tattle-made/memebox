const { health } = require("./health");
const { meme } = require("./memes/controller");
const { annotationForm } = require("./annotation-form/controller");
const { annotation } = require("./annotation/controller");

module.exports = {
  health,
  meme,
  annotationForm,
  annotation,
};
