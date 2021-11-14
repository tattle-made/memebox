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

    static async getAnnotationForm(collectionId) {
      const res = await annotationForm.findOne({
        where: {
          collectionId,
        },
        include: [sequelize.models.annotationFormField],
        order: [
          [{ model: sequelize.models.annotationFormField }, "order", "ASC"],
        ],
      });
      return res.get({ plain: true });
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
      collectionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "collections",
          key: "id",
        },
      },
      userId: {
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
