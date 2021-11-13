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
        foreignKey: "collection",
      });
      collection.hasOne(models.annotationForm);
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
      author: {
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
