import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from './FirebaseAuth';
/* import { setLoggedIn } from '../../features/userSlice'; */
import { AuthContext } from './FirebaseContext';
import { redirect } from "react-router-dom";


type Props = {
    children: JSX.Element
};

export const AuthProvider: React.FC<Props> = ({ children }) => {

    const dispatch = useDispatch();

    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (auth.currentUser) {
                setFirebaseUser(user);
           /*      dispatch(setLoggedIn(true)) */
            } else {
                setFirebaseUser(null);
            /*     dispatch(setLoggedIn(false)); */
                redirect('/');
            }
        });
    }, [dispatch]);

    return (
        <AuthContext.Provider value={firebaseUser}>{children}</AuthContext.Provider>//
    )
}
