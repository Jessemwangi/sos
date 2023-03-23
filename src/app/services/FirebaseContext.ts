import React from 'react';
import { auth } from './FirebaseAuth';
import { User } from "firebase/auth";

type AuthContextType = User | null;

export const AuthContext = React.createContext<AuthContextType>(null);

