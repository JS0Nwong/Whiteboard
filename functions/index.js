const {
    onDocumentCreated,
    onDocumentDeleted,
  } = require("firebase-functions/v2/firestore");
  const { initializeApp } = require("firebase-admin/app");
  const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const crypto = require('crypto')
  
  initializeApp();

  const template = {
    Todo: {
      columnColor: "249, 65, 68",
      description: "This item hasn't been started",
      id: crypto.randomUUID(),
      tasks: [],
    },
    InProgress: {
      columnColor: "249, 199, 79",
      description: "This is actively being worked on",
      id:  crypto.randomUUID(),
      tasks: [],
    },
    Completed: {
      columnColor: "144, 190, 109",
      description: "This has been completed",
      id:  crypto.randomUUID(),
      tasks: [],
    },
  };

  
  exports.createBoardData = onDocumentCreated(
    "users/{uid}/boards/{boardId}",
    async (event) => {
      const { uid, boardId } = event.params;
      const firestore = getFirestore();
  
      return await firestore.doc(`users/${uid}/boardsData/${boardId}`).set({
        columns: template,
        lastUpdated: FieldValue.serverTimestamp(),
        orderBy: Object.keys(columns)
      });
    }
  );
  
  exports.deleteBoardData = onDocumentDeleted(
    "users/{uid}/boards/{boardId}",
    async (event) => {
      const { uid, boardId } = event.params;
      const firestore = getFirestore();
  
      return await firestore.doc(`users/${uid}/boardsData/${boardId}`).delete();
    }
  );