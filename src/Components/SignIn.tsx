import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

import { toggleSigninModal } from '../features/headerSlice';
import { SignInData } from '../app/model';
import { auth, signInUser } from '../app/services/FirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';

const SignIn = () => {

    const dispatch = useDispatch();

    const init: SignInData = {
        email: "",
        password: "",

    }

    //only for local state signin process
    const [signinData, setSigninData] = useState(init);

    const [user] = useAuthState(auth);

    function changeHandler(e: any) {
        setSigninData({ ...signinData, [e.currentTarget.name]: e.currentTarget.value });
    }

    function handleSignIn(e: any, signinData: SignInData) {
        e.preventDefault();

        signInUser(signinData.email, signinData.password)

        //TOFIX: error alert if account doesn't exist


    }

    return (
        <Dialog
            open={useSelector((state: any) => state.header.signinModal)}
            onClose={() => dispatch(toggleSigninModal(false))}
            aria-labelledby="modal-register"
            aria-describedby="modal-modal-description">
            <DialogTitle>Sign In with Email</DialogTitle>
            {!user ? (<>
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
            </>) : (<>
                <DialogContent>
                    <DialogContentText>{`Hi ${user?.displayName}, you have been signed in. `}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={() => dispatch(toggleSigninModal(false))}>Close</Button>
                </DialogActions></>
            )}



        </Dialog>
    );
};

export default SignIn;