"use strict";
const { v4: uuidv4 } = require("uuid");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        username: "user_a",
        password: "pass_a",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "user_b",
        password: "pass_b",
        role: "editor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "user_c",
        password: "pass_c",
        role: "author",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "user_d",
        password: "pass_d",
        role: "author",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: "user_e",
        password: "pass_e",
        role: "author",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const doubleUserIds = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );
    const userIDs = doubleUserIds[0];

    await queryInterface.bulkInsert("memes", [
      {
        id: uuidv4(),
        userId: userIDs[2].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "post",
        preview: "https://picsum.photos/id/200/200/300",
        store_url: "https://picsum.photos/id/201/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[2].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "post",
        preview: "https://picsum.photos/id/202/200/300",
        store_url: "https://picsum.photos/id/203/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[2].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "image",
        preview: "https://picsum.photos/id/204/200/300",
        store_url: "https://picsum.photos/id/205/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[2].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "image",
        preview: "https://picsum.photos/id/206/200/300",
        store_url: "https://picsum.photos/id/207/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[3].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "image",
        preview: "https://picsum.photos/id/208/200/300",
        store_url: "https://picsum.photos/id/209/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[3].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "image",
        preview: "https://picsum.photos/id/210/200/300",
        store_url: "https://picsum.photos/id/211/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[3].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "image",
        preview: "https://picsum.photos/id/212/200/300",
        store_url: "https://picsum.photos/id/213/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[4].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "image",
        preview: "https://picsum.photos/id/214/200/300",
        store_url: "https://picsum.photos/id/215/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[4].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "image",
        preview: "https://picsum.photos/id/200/200/300",
        store_url: "https://picsum.photos/id/201/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[4].id,
        url: `http://instagram.com/p/${uuidv4()}`,
        platform: "instagram",
        content_type: "image",
        preview: "https://picsum.photos/id/200/200/300",
        store_url: "https://picsum.photos/id/201/200/300",
        title: lorem.generateWords(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const doubleMemeIDs = await queryInterface.sequelize.query(
      `SELECT id from memes;`
    );
    const memeIDs = doubleMemeIDs[0];

    await queryInterface.bulkInsert("collections", [
      {
        id: uuidv4(),
        userId: userIDs[1].id,
        name: lorem.generateWords(1),
        description: lorem.generateWords(10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[1].id,
        name: lorem.generateWords(1),
        description: lorem.generateWords(10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const doubleCollectionIDs = await queryInterface.sequelize.query(
      `SELECT id from collections;`
    );
    const collectionIDs = doubleCollectionIDs[0];

    await queryInterface.bulkInsert("memeCollectionMaps", [
      {
        id: uuidv4(),
        memeId: memeIDs[0].id,
        collectionId: collectionIDs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        memeId: memeIDs[1].id,
        collectionId: collectionIDs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        memeId: memeIDs[2].id,
        collectionId: collectionIDs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        memeId: memeIDs[3].id,
        collectionId: collectionIDs[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: uuidv4(),
        memeId: memeIDs[4].id,
        collectionId: collectionIDs[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("annotationForms", [
      {
        id: uuidv4(),
        userId: userIDs[1].id,
        name: lorem.generateWords(2),
        description: lorem.generateWords(10),
        collectionId: collectionIDs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIDs[1].id,
        name: lorem.generateWords(3),
        description: lorem.generateWords(10),
        collectionId: collectionIDs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const doubleAnnotationFormIDs = await queryInterface.sequelize.query(
      `SELECT id from annotationForms;`
    );
    const AnnotationFormIDs = doubleAnnotationFormIDs[0];

    await queryInterface.bulkInsert("annotationFormFields", [
      {
        id: uuidv4(),
        type: "radio",
        label: "Is this Cringe?",
        key: "cringe",
        order: 1,
        annotationForm: AnnotationFormIDs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        type: "radio",
        label: "Do you find it harmful?",
        key: "harmful",
        order: 2,
        annotationForm: AnnotationFormIDs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        type: "radio",
        label: "Does this contain misinformation?",
        key: "contains_misinformation",
        order: 3,
        annotationForm: AnnotationFormIDs[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        type: "text",
        label: "How would you categorize this?",
        key: "category_text",
        order: 1,
        annotationForm: AnnotationFormIDs[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        type: "text",
        label: "Any additional notes",
        key: "notes",
        order: 2,
        annotationForm: AnnotationFormIDs[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const doubleAnnotationFormFieldIDs = await queryInterface.sequelize.query(
      `SELECT id from annotationForms;`
    );
    const doubleAnnotationFormField = doubleAnnotationFormFieldIDs[0];

    // inserting annotation
    await queryInterface.bulkInsert("annotations", [
      {
        id: uuidv4(),
        memeId: memeIDs[0].id,
        collectionId: collectionIDs[0].id,
        key: "cringe",
        value: "1",
        type: "radio",
        userId: userIDs[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("memes", null, {});
    await queryInterface.bulkDelete("memeCollectionMaps", null, {});
    await queryInterface.bulkDelete("collections", null, {});
    await queryInterface.bulkDelete("annotations", null, {});
    await queryInterface.bulkDelete("annotationForms", null, {});
    await queryInterface.bulkDelete("annotationFormFields", null, {});
  },
};
