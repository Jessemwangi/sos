import React, { createContext, useState, useEffect }from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './FirebaseAuth';
import { SosUser } from '../model';
import firebase from 'firebase/app'; 


type Props = {
    children: JSX.Element
  };

type User = firebase.User; 
type AuthState = {user:User}

export const AuthContext = React.createContext(<AuthState | undefined>(undefined));


const AuthProvider:React.FC<Props> = ({ children}) => {

const dispatch = useDispatch();

/*   const userInit: SosUser = {
    name: "",
    email: "",
    uid: ""
    }
    
const [user, setUser] = useState<SosUser>(userInit); */

  useEffect(() => {
   onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('signed in:', uid);
      //dispatch(setUser(userPayload));
    } else {
    //  setUser(userInit)
    }
  });;
  }, []);

  return (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  );
}

  export {AuthProvider};