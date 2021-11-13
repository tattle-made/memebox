"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class annotation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      annotation.belongsTo(models.meme);
      annotation.belongsTo(models.collection);
      annotation.belongsTo(models.user);
    }
  }
  annotations.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      meme: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "memes",
          key: "id",
        },
      },
      collection: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "collections",
          key: "id",
        },
      },
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      author: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      type: DataTypes.ENUM("text", "date", "radio", "range"),
    },
    {
      sequelize,
      modelName: "annotations",
    }
  );
  return annotations;
};
