"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("memes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
      },
      url: {
        type: Sequelize.STRING,
      },
      platform: {
        type: Sequelize.STRING,
      },
      content_type: {
        type: Sequelize.STRING,
      },
      preview: {
        type: Sequelize.STRING,
      },
      store_url: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("memes");
  },
};
