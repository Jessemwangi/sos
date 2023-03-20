import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle,TextField } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import "../styles/Main.css";

import { toggleSigninModal, toggleSignupModal } from '../features/headerSlice';
import {createUserWithEmailAndPassword }  from "firebase/auth";


const Main = () => {

    const dispatch = useDispatch();
    const signinModal = useSelector((state:any)=> state.header.signinModal)
    const signupModal = useSelector((state:any)=> state.header.signupModal)
    console.log(signinModal);//debugging

    const emailField = useRef('email');
    const passwordField = useRef('password');
console.log(emailField.current)

    function handleSubmit(e:any){
        e.prevent.default();
        console.log('submitted')//debugging
        ;
    }


    return (
        <div className="main">
            <Outlet />
            <Dialog
            open={signinModal}
            onClose={()=>dispatch(toggleSigninModal(false))}
            aria-labelledby="modal-register"
            aria-describedby="modal-modal-description">
                <DialogTitle>Sign Up with Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a valid email address and create a password for your account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
           inputRef={emailField}
          />
           <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            inputRef={passwordField}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
            </Dialog>
            
            <Dialog
            open={signupModal}
            onClose={()=> dispatch(toggleSignupModal(false))}
            aria-labelledby="modal-register"
            aria-describedby="modal-modal-description">
            </Dialog>
        </div>
    );
};

export default Main;