"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("annotations", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      meme: {
        type: Sequelize.UUID,
      },
      collection: {
        type: Sequelize.UUID,
      },
      key: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
      },
      author: {
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
