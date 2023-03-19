import React from 'react';
import { useSelector } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
    const user = useSelector((state: any) => state.user.user);
    console.log(user);

    const auth = getAuth();
/*     //createUserWithEmailAndPassword(auth, email, password)
    //.then((userCredential) => {
    // Signed in 
    //const user = userCredential.user;
    // ...
  })
  //.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); */


    return (
        <div>
            <h1>Register with SOS Service</h1>

        </div>
    );
};

export default Registration;