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
  verifyAuth(context);
  const userData = userCollection.doc(data.id);
  if(data.id === context.auth.token.uid) {
    return userData;
  } else {
    return userData ? {
      id: userData.id,
      name: userData.anonymous ? null : userData.name,
      splits: splits.filter(s => s.public)
    } : null;
  }
});

exports.syncUserToCloud = functions.https.onCall((data, context) => {
  verifyAuth(context);
  if (!data || !data.user || !data.user.id || !data.user.name) {
    throw new functions.https.HttpsError("malformatted", "New user requires proper format!");
  }
  userCollection.doc(context.auth.uid).set(data.user);
});