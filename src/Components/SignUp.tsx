import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';


import { createAccount } from '../app/services/FirebaseAuth';
//import { CreateDocSetId } from '../app/services/DbFunctions';
import { toggleSignupModal } from '../features/headerSlice';
import { setSosUser } from '../features/userSlice';
import { SignUpData, SosUser } from '../app/model';
import { AuthContext } from '../app/services/FirebaseContext';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sosUser: SosUser = useSelector((state: any) => state.user.sosUser)
    const loggedIn: boolean = useSelector((state: any) => state.user.loggedIn);

    const user = useContext(AuthContext);

    const init: SignUpData = {
        email: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: ""
    }

    const [signUpData, setSignUpData] = useState(init);

    function changeHandler(e: any) {
        setSignUpData({ ...signUpData, [e.currentTarget.name]: e.currentTarget.value });
    }

    function handleProfileClick() {
        dispatch(toggleSignupModal(false));
        navigate('/regwizard');

    }

    // CreateDocSetId('profile', uid, { uid: uid })

    async function handleSignUp(e: any, signUpData: SignUpData) {
        e.preventDefault();
        if (signUpData.password !== signUpData.confirmPassword) {
            console.log('passwords do not match');
            return;
        }
        const firebaseUser = createAccount(signUpData.email, signUpData.password);//uid created by firebase
        dispatch(setSosUser({ email: signUpData.email, name: signUpData.firstname, uid: user?.uid }));
        console.log(firebaseUser);
        console.log(sosUser)
    }


    return (

        <Dialog
            open={useSelector((state: any) => state.header.signupModal)}
            onClose={() => dispatch(toggleSignupModal(false))}
            aria-labelledby="modal-register"
            aria-describedby="modal-modal-description">
            <DialogTitle>Sign Up with Email</DialogTitle>

            {!loggedIn ? (<>
                <DialogContent>
                    <DialogContentText>
                        Please enter a valid email address and create a password for your account.
                    </DialogContentText>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstname"
                            name="firstname"
                            label="First Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            autoComplete='firstname'
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
                    {}
                    <Button type="submit" onClick={(e) => handleSignUp(e, signUpData)}>Submit</Button>
                </DialogActions>
            </>) : (
                <>
                    <DialogContent>
                        <DialogContentText>Account created. Click the button below to complete the registration process.
                        </DialogContentText>
                        <DialogActions>
                            <Button type="button" onClick={handleProfileClick}>To Profile</Button>
                        </DialogActions>
                    </DialogContent></>

            )}

        </Dialog>
    );
};

export default SignUp;