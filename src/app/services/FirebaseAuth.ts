import {
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
  signOut, onAuthStateChanged,
  updateProfile
} from "firebase/auth";

import { app } from '../../DataLayer/FirestoreInit';
//import {setUser} from '../../features/userSlice';


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
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error(errorCode, errorMessage, credential);
      })
}

async function signInUser(email:string, password:string){
  await signInWithEmailAndPassword(auth, email, password)
  .then(
   (userCredential)=>{
      const user = userCredential.user;
    console.log(userCredential);
  console.log(user.uid);
} 
    
      //connect to store here
 )
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage)})
} 

function createAccount(email:string, password:string){
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

function signOutUser(){
  signOut(auth).then(() => {
     console.log('signed out');
    }).catch((error:any
    ) => {
     console.log(error)
    })
}

export { googleSignIn, signInUser, createAccount, signOutUser };