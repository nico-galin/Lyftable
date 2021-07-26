const functions = require("firebase-functions");
const firestore = require("@google-cloud/firestore");
const db = new firestore();
const userCollection = db.collection("users");
const verifyAuth = (context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Endpoint requires authentication!");
  }
}
exports.getUser = functions.https.onCall((data, context) => {
  return new Promise((resolve, reject) => {
    verifyAuth(context);
    userCollection.doc(data.id).get().then(doc => {
      if (doc.exists) {
        const userData = doc.data();
        if(data.id === context.auth.token.uid) {
          resolve(userData)
        } else {
          return userData ? {
            id: userData.id,
            name: userData.anonymous ? null : userData.name,
            splits: splits.filter(s => s.public)
          } : null;
        }
      } else {
        resolve(null);
      }
    })
  });
});

exports.syncUserToCloud = functions.https.onCall((data, context) => {
  verifyAuth(context);
  if (!data || !data.user || !data.user.id || !data.user.name) {
    console.log(data);
    throw new functions.https.HttpsError("malformatted", "New user requires proper format!");
  }
  userCollection.doc(context.auth.uid).set(data.user);
});

exports.getSplitFromUser = functions.https.onCall((data, context) => {
  return new Promise((resolve, reject) => {
    verifyAuth(context);
    if (!data || !data.id || !data.userId) {
      console.log("NO NO NO")
      throw new functions.https.HttpsError("malformatted", "Get split from user requires proper format!");
    }
    userCollection.doc(data.userId).get().then(doc => {
      if (doc.exists) {
        const split = doc.data().splits[data.id];
        if (split && Object.keys(split).length > 0) {
          resolve(split);
        }
      } else {
        resolve(null);
      }
    })
  });
})