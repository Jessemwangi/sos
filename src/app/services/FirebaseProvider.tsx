import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './FirebaseAuth';
import { SosUser } from '../model';
import { User } from "firebase/auth";
import { setUserStore } from '../../features/userSlice';
import { AuthContext } from './FirebaseContext';

type Props = {
    children: JSX.Element
};


const AuthProvider: React.FC<Props> = ({ children }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log('signed in:', uid); //from firebase user object
                dispatch(setUserStore({ name: user.displayName, email: user.email, uid: user.uid }));
                return user;
            } else {
                navigate('/');
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    )
}