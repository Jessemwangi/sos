import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Popover, MenuList, MenuItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { togglePopover, closePopover, toggleSignupModal, toggleSigninModal } from '../features/headerSlice';
import { SignUp, SosUser } from '../app/model';
import { googleSignIn, signInUser, createAccount, signOutUser } from '../app/services/FirebaseAuth';
import {setUser} from '../features/userSlice';
import '../styles/Header.css';

//const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_ID = '127054368864-db825ognn1j3bdg4rl224ums2j7k2g07';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuButton = document.getElementById('menuButton');
    const user: SosUser = useSelector((state: any) => state.user.user)
    let openMenuPopover: boolean = useSelector((state: any) => state.header.popoverState.mainMenu);

    const init: SignUp = {
        email: "",
        password: ""
    }

    const [signinData, setSigninData] = useState(init);

    const sxStyles = {
        position: 'static',
        height: '20vh'
    }

    function openMenu(e: any) {
        dispatch(togglePopover({ mainMenu: true }));
    }

    function closeMenu(e: any) {
        dispatch(closePopover({ mainMenu: false }));
    }

    function changeHandler(e: any) {
        setSigninData({ ...signinData, [e.currentTarget.name]: e.currentTarget.value });
    }

    function handleSignIn(e: any, signinData: SignUp) {
        e.preventDefault();
        signInUser(signinData.email, signinData.password);
    }

    async function handleSignUp(e: any, signinData: SignUp) {
        e.preventDefault();
        createAccount(signinData.email, signinData.password)
  /*       if (user) { 
            dispatch(setUser({email: user.email, uid: user.uid}));
            navigate("/regwizard") } */
    }

    function handleSignOut() {
        signOutUser();
    }


    return (
        <div className='header'>
            <AppBar className="appBar" sx={{ position: 'static' }}>
                <div className='signInDiv'>


                    <div>
                        {!user? (<>
                            <Button style={{ color: 'white' }} onClick={() => dispatch(toggleSignupModal(true))}>Create Account</Button>
                            <Button style={{ color: 'white' }} onClick={() => dispatch(toggleSigninModal(true))}>Sign In</Button>
                        </>) : (<>
                            <Button style={{ color: 'white' }} onClick={handleSignOut}>Sign Out</Button>
                        </>

                        )}
                    </div>


                </div>
                <Toolbar className="toolBar" sx={sxStyles}>
                    <Button><MenuIcon id="menuButton" onClick={openMenu} /></Button>
                    <Link to='/'><Typography variant="h3" sx={{ color: 'white' }}>SOS Service</Typography><p>To Dashboard</p></Link>
                </Toolbar>
            </AppBar>
            <Popover id="menuPopover" open={openMenuPopover} anchorEl={menuButton} onClose={closeMenu}>
                <MenuList>
                    <Link to="/help"><MenuItem onClick={closeMenu}>How to use SOS</MenuItem></Link>
                    <Link to="/customsignals"><MenuItem onClick={closeMenu}>Customize Emergency Signals</MenuItem></Link>
                    <Link to="/custommsg"><MenuItem onClick={closeMenu}>Customize Messages</MenuItem></Link>
                    <Link to='/profile'><MenuItem onClick={closeMenu}>Manage Profile</MenuItem></Link>
                    <Link to="/recipients"><MenuItem onClick={closeMenu}>Manage Contacts</MenuItem></Link>
                </MenuList>
            </Popover>

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
                        /></form>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={(e) => handleSignUp(e, signinData)}>Submit</Button>
                </DialogActions>
            </Dialog>

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

        </div>
    );
};

export default Header;