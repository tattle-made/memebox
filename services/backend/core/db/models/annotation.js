"use strict";
const { Model, Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

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

    static async getAnnotations(collectionId, memeId) {
      const annotations = await annotation.findAll({
        where: { [Op.and]: [{ collectionId }, { memeId }] },
      });
      const plainAnnotations = annotations.map((annotation) =>
        annotation.get({ plain: true })
      );
      return annotations;
    }

    static async saveAnnotations(userId, collectionId, memeId, annotations) {
      await Promise.all(
        annotations.map((annotationItem) => {
          return annotation
            .findOne({
              where: {
                [Op.and]: [
                  { userId },
                  { collectionId },
                  { memeId },
                  { key: annotationItem.key },
                ],
              },
            })
            .then((obj) => {
              // console.log(obj);
              if (obj) {
                return obj.update({
                  key: annotationItem.key,
                  value: annotationItem.value,
                });
              } else {
                return annotation.create({
                  id: uuidv4(),
                  userId,
                  memeId,
                  collectionId,
                  key: annotationItem.key,
                  value: annotationItem.value,
                  type: annotationItem.type,
                });
              }
            });
        })
      );
      return { message: "done" };
    }
  }
  annotation.init(
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
          model: "collections",
          key: "id",
        },
      },
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      userId: {
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
      modelName: "annotation",
    }
  );
  return annotation;
};
