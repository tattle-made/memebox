"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class memeCollectionMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  memeCollectionMap.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      memeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "memes",
          key: "id",
        },
      },
      collectionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "collection",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "memeCollectionMap",
    }
  );
  return memeCollectionMap;
};
