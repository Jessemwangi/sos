import { toggleSigninModal } from '../features/headerSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpData, SosUser } from '../app/model';
import { googleSignIn, signInUser } from '../app/services/FirebaseAuth';
import React from 'react';

const SignIn = () => {

    const dispatch = useDispatch();

    const init: SignUpData = {
        email: "",
        password: "",
    }

    //only for local state signin process
    const [signinData, setSigninData] = useState(init);

    const sosUser: SosUser = useSelector((state: any) => state.user.sosUser)
    const loggedIn: boolean = useSelector((state: any) => state.user.loggedIn)

    function changeHandler(e: any) {
        setSigninData({ ...signinData, [e.currentTarget.name]: e.currentTarget.value });
    }

    function handleSignIn(e: any, signinData: SignUpData) {
        e.preventDefault();
        signInUser(signinData.email, signinData.password)
    }

    return (
        <Dialog
            open={useSelector((state: any) => state.header.signinModal)}
            onClose={() => dispatch(toggleSigninModal(false))}
            aria-labelledby="modal-register"
            aria-describedby="modal-modal-description">
            <DialogTitle>Sign In with Email</DialogTitle>
            {!loggedIn ? (<>
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
                    <DialogContentText>{`Hi ${sosUser.name}, you have been signed in. `}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={() => dispatch(toggleSigninModal(false))}>Close</Button>
                </DialogActions></>
            )}



        </Dialog>
    );
};

export default SignIn;