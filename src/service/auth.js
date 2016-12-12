import db from './db';

let authInstance;
let currentUser = {};

const service = {
  register(email, password) {
    return db.auth().createUserWithEmailAndPassword(email, password);
  },

  login(email, password) {
    return db.auth().signInWithEmailAndPassword(email, password);
  },

  signOut() {
    return db.auth().signOut();
  },

  setCurrentUser(user) {
    currentUser = user;
  },

  getCurrentUser() {
    return currentUser;
  },

  authorized() {
    return !!this.getCurrentUser();
  },

  updateUserInfo(userInfo) {
    return db.auth().currentUser.updateProfile(userInfo);
  },

  instance() {
    if (!authInstance) {
      authInstance = db.auth();
    }

    return authInstance;
  },
};

export default service;
