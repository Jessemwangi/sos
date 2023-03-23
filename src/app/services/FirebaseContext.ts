import React, { createContext } from 'react';
import { auth } from './FirebaseAuth';
import { User } from "firebase/auth";
import { setUserStore } from '../../features/userSlice';


type AuthState = { user: User }

export const AuthContext = React.createContext(<AuthState | null>(null));

