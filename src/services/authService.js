import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const signInWithEmail = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    console.log(e.message);
    throw new Error(e.message);
  }
};

const signInWithApple = async () => {
  try {
    // Implement Apple Sign-in Later
    throw new Error(400);
  } catch (e) {
    throw new Error(e.message);
  }
};

const signInWithGoogle = async () => {
  try {
    GoogleSignin.configure({
      webClientId:
        '452551347631-16citeoeq2getju0cqdjngmk5dfiruvs.apps.googleusercontent.com',
    });

    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential);

    const currentUser = await GoogleSignin.getCurrentUser();
    return {
      method: 'google',
      user: currentUser,
    };
  } catch (e) {
    console.log(e.message);
    throw new Error(e.message);
  }
};

export const authService = {
  signInWithEmail,
  signInWithGoogle,
  signInWithApple,
};
