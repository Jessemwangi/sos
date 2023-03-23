import {toggleSigninModal } from '../features/headerSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { setUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpData } from '../app/model';
import { googleSignIn, signInUser, createAccount, signOutUser } from '../app/services/FirebaseAuth';
import React from 'react';

const SignIn = () => {

    const init: SignUpData = {
        email: "",
        password: "",
        name: ""
    }
    
    const [signinData, setSigninData] = useState(init);
    const dispatch = useDispatch();

    function changeHandler(e: any) {
        setSigninData({ ...signinData, [e.currentTarget.name]: e.currentTarget.value });
    }

    function handleSignIn(e: any, signinData: SignUpData) {
        e.preventDefault();
        signInUser(signinData.email, signinData.password);
    }
    return (
        <Dialog
        open={useSelector((state: any) => state.header.signinModal)}
        onClose={() => dispatch(toggleSigninModal(false))}
        aria-labelledby="modal-register"
        aria-describedby="modal-modal-description">
        <DialogTitle>Sign In with Email</DialogTitle>
        <DialogContent>
            <DialogContentText>Enter your account email and password</DialogContentText>
            <form>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    autoComplete='email'
                    onChange={changeHandler}

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
                    autoComplete='current-password'
                    onChange={changeHandler}

                />
            </form>
        </DialogContent>
        <DialogActions>
            <Button type="submit" onClick={(e) => handleSignIn(e, signinData)}>Submit</Button>
        </DialogActions>
    </Dialog>
    );
};

export default SignIn;