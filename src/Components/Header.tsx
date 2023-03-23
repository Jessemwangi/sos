import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Popover, MenuList, MenuItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { togglePopover, closePopover, toggleSignupModal, toggleSigninModal } from '../features/headerSlice';
import { SignUpData, SosUser } from '../app/model';
import { googleSignIn, signInUser, createAccount, signOutUser } from '../app/services/FirebaseAuth';
import {setUser} from '../features/userSlice';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../styles/Header.css';

//const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_ID = '127054368864-db825ognn1j3bdg4rl224ums2j7k2g07';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuButton = document.getElementById('menuButton');
    const user: SosUser = useSelector((state: any) => state.user.user)
    let openMenuPopover: boolean = useSelector((state: any) => state.header.popoverState.mainMenu);

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

    function handleSignOut() {
        signOutUser();
    }


    return (
        <div className='header'>
            <AppBar className="appBar" sx={{ position: 'static' }}>
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
        </div>
    );
};

export default Header;