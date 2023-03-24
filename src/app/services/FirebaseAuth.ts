import {
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
  signOut, updateProfile
} from "firebase/auth";

import { app } from '../../DataLayer/FirestoreInit';

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
        console.log(userCredential);
        return user;
      })
    .catch((error) => {
      const errorMessage = error.message;
      return (errorMessage)
    })
}

function createAccount(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage)
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