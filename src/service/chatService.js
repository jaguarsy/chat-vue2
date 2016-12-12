import db from './db';
import auth from './auth';

const syncInstance = db.sync();
const messageRef = syncInstance.ref('messages');

const service = {
  send(content) {
    const user = auth.getCurrentUser();
    const message = {
      uid: user.uid,
      content,
      time: Date.now(),
      name: user.displayName || user.email,
      photo: user.photoURL,
    };

    messageRef.push(message);
  },

  onMessage(callback) {
    messageRef.on('child_added', (snapshot) => {
      callback(snapshot.val());
    });
  },

  offMessage() {
    messageRef.off('child_added');
  },
};

export default service;
