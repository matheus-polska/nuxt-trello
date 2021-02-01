import firebaseApp from "./app";

const initFireStore = firebaseApp.firestore();

const db = initFireStore;

export { db };
