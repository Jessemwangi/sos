import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import React from 'react';

const Signin = () => {

    const auth = getAuth();
    const email:string = 'this';
    const password:string = 'that';


setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

    return (
        <div>
            <h1>Sign In</h1>
            <form>
                <label htmlFor="email">Email</label><input id="email" name="email"></input>
                <label htmlFor="password">Password</label><input id="password" name="password"></input>
            </form>
        </div>
    );
};

export default Signin;





