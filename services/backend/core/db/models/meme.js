"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { pageSize } = require("../../../config");
module.exports = (sequelize, DataTypes) => {
  class meme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      meme.belongsTo(models.user);
      meme.belongsToMany(models.collection, {
        through: models.memeCollectionMap,
        foreignKey: "memeId",
      });
    }

    static async createByURL(
      url,
      author,
      title,
      platform,
      contentType,
      preview,
      storeUrl
    ) {
      const newMeme = await meme.create({
        id,
        url,
        author,
        title,
        platform,
        content_type: contentType,
        preview,
        store_url: storeUrl,
      });
      return newMeme.get({ plain: true });
    }

    static async get(pageNum) {
      const { rows, count } = await meme.findAndCountAll({
        limit: 20,
        offset: pageNum * pageSize,
      });
      const plainRows = rows.map((row) => row.get({ plain: true }));
      return { memes: plainRows, count };
    }

    static async getMemesByUserId(userId, pageNum) {
      const { rows, count } = await meme.findAndCountAll({
        where: {
          userId,
        },
        limit: 20,
        offset: pageNum * pageSize,
      });
      const plainRows = rows.map((row) => row.get({ plain: true }));
      return { memes: plainRows, count };
    }
  }
  meme.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      url: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      platform: DataTypes.STRING,
      content_type: DataTypes.STRING,
      preview: DataTypes.STRING,
      store_url: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "meme",
    }
  );
  return meme;
};
