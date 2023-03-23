import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from './FirebaseAuth';
import { setUserStore } from '../../features/userSlice';
import { AuthContext } from './FirebaseContext';

type Props = {
    children: JSX.Element
};

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const dispatch = useDispatch();

    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);



    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setFirebaseUser(user);
                const uid = user.uid;
                console.log('signed in:', uid); //from firebase user object
                dispatch(setUserStore({ name: user.displayName, email: user.email, uid: user.uid }));
            } else {
                setFirebaseUser(null);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={firebaseUser}>{children}</AuthContext.Provider>//this is type AuthState | null
    )
}



/* Type 'User | null' is not assignable to type 'AuthState | null'.
Property 'user' is missing in type '{ authState: User | null; }' but required in type 'AuthState'.

  Property 'user' is missing in type 'User' but required in type 'AuthState'.ts(2322)
FirebaseContext.ts(7, 20): 'user' is declared here.
index.d.ts(329, 9): The expected type comes from property 'value' which is declared here on type 'IntrinsicAttributes & ProviderProps<AuthState | null>' */

/* firebase.User type properties:
displayName
email
emailVerified
isAnonymous
metadata
multiFactor
phoneNumber
photoURL
providerData
providerId
refreshToken
tenantId
uid */