"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.meme);
      user.hasMany(models.collection);
      user.hasMany(models.annotationForm);
      user.hasMany(models.annotation);
      user.hasMany(models.badge);
    }
  }
  user.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("author", "editor", "admin"),
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
