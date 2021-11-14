"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class annotationFormField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  annotationFormField.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      type: DataTypes.ENUM("text", "date", "radio", "range"),
      key: DataTypes.STRING,
      label: DataTypes.STRING,
      order: DataTypes.INTEGER,
      annotationFormId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "annotationForms",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "annotationFormField",
    }
  );
  return annotationFormField;
};
