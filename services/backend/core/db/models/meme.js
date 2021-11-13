"use strict";
const { Model } = require("sequelize");
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
        foreignKey: "meme",
      });
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
      author: {
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
