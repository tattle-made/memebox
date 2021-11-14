"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      collection.belongsTo(models.user);
      collection.belongsToMany(models.meme, {
        through: models.memeCollectionMap,
        foreignKey: "collectionId",
      });
      collection.hasOne(models.annotationForm);
    }

    static async getMemesByCollectionId(collectionId, pageNum) {
      const [resultCount, countMetadata] = await sequelize.query(`
       SELECT COUNT(collectionId) as count FROM memeCollectionMaps WHERE collectionId="${collectionId}"
      `);

      const count = resultCount[0].count;

      const [results, metadata] = await sequelize.query(
        `SELECT memeId, collectionId from memeCollectionMaps WHERE collectionId="${collectionId}"`
      );

      const memes = await Promise.all(
        results.map(async (result) => {
          const [memeResults, memeMetadata] = await sequelize.query(
            `SELECT * from memes WHERE id="${result.memeId}"`
          );
          return memeResults[0];
        })
      );

      return { memes, count };
    }
  }
  collection.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "collection",
    }
  );
  return collection;
};
