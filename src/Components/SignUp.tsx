import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setSosUser } from '../features/userSlice';
import { googleSignIn, signInUser, createAccount, signOutUser } from '../app/services/FirebaseAuth';
import { SignUpData, SosUser } from '../app/model';
import { toggleSignupModal } from '../features/headerSlice';


const SignUp = () => {
    const dispatch = useDispatch();

    const init: SignUpData = {
        email: "",
        password: "",
        name: ""
    }

    const [signUpData, setSignUpData] = useState(init);

    const user: SosUser = useSelector((state: any) => state.user.user);

    function changeHandler(e: any) {
        setSignUpData({ ...signUpData, [e.currentTarget.name]: e.currentTarget.value });
    }


    async function handleSignUp(e: any, signUpData: SignUpData) {
        e.preventDefault();
        createAccount(signUpData.email, signUpData.password)
        /*       if (user) { 
                  dispatch(setUser({email: user.email, uid: user.uid}));
                  navigate("/regwizard") } */
    }


    return (
        <Dialog
            open={useSelector((state: any) => state.header.signupModal)}
            onClose={() => dispatch(toggleSignupModal(false))}
            aria-labelledby="modal-register"
            aria-describedby="modal-modal-description">
            <DialogTitle>Sign Up with Email</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a valid email address and create a password for your account.
                </DialogContentText>
                <form>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        autoComplete='name'
                        onChange={changeHandler}
                    />
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
                        autoComplete='new-password'
                        onChange={changeHandler}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={changeHandler}
                    /></form>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={(e) => handleSignUp(e, signUpData)}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SignUp;