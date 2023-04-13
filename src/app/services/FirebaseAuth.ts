import {
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
  signOut, updateProfile,
} from "firebase/auth";

import { app } from '../../DataLayer/FirestoreInit';
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();

export const auth = initializeAuth(app, {
  persistence: browserSessionPersistence
});


function googleSignIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      const user = result.user;
      return (user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      return (errorMessage);
    })
}

async function signInUser(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
    .then(
      (userCredential) => {
        const user = userCredential.user;
        return user;
      })
    .catch((error) => {
      let errorMessage = error.message;
      errorMessage = errorMessage.substring(errorMessage.indexOf(' '));
      toast.error(errorMessage)
    })
}

async function createAccount(displayName: string, email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (user) {
        updateProfile(user, { displayName: displayName })
      }
      return user;

    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error, errorMessage);

      toast.error(error.message)
    });
}

function signOutUser() {
  signOut(auth).then(() => {
    console.log('signed out');
  }).catch((error: any
  ) => {
    console.log(error)
  })
}

export { googleSignIn, signInUser, createAccount, signOutUser };