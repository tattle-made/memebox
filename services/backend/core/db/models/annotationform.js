"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class annotationForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      annotationForm.belongsTo(models.user);
      annotationForm.belongsTo(models.collection);
      annotationForm.hasMany(models.annotationFormField);
    }
  }
  annotationForm.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      collection: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "collections",
          key: "id",
        },
      },
      author: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "annotationForm",
    }
  );
  return annotationForm;
};
