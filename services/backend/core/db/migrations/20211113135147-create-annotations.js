"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("annotations", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
      },
      memeId: {
        type: Sequelize.UUID,
      },
      collectionId: {
        type: Sequelize.UUID,
      },
      key: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.UUID,
      },
      type: {
        type: Sequelize.ENUM("text", "date", "radio", "range"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("annotations");
  },
};
