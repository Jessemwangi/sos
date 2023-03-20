import {
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    browserSessionPersistence,
    GoogleAuthProvider,
    OAuthCredential
} from "firebase/auth";

import { app } from '../../DataLayer/FirestoreInit';


const provider = new GoogleAuthProvider();
const auth = getAuth(app);

function signinWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            //const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
            //const token = credential!.accessToken;
            const user = result.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });

}



/* if (user) {
    user.getIdToken().then((token) => {
        // set access token in session storage
        sessionStorage.setItem("accessToken", token);
        setAuthorizedUser(true);
    })
} */


export { signinWithGoogle }