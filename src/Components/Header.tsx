import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Popover, MenuList, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { togglePopover, closePopover, toggleSignupModal, toggleSigninModal } from '../features/headerSlice';
import { auth, signOutUser } from '../app/services/FirebaseAuth';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../styles/Header.css';
import { useAuthState } from "react-firebase-hooks/auth";

//const google_client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuButton = document.getElementById('menuButton');

    let openMenuPopover: boolean = useSelector((state: any) => state.header.popoverState.mainMenu);

    const [user] = useAuthState(auth);

    function openMenu(e: any) {
        dispatch(togglePopover({ mainMenu: true }));
    }

    function closeMenu(e: any) {
        dispatch(closePopover({ mainMenu: false }));
    }

    function handleSignOut() {
        signOutUser();
        navigate('/');
    }

    return (
        <div className='header'>
            <AppBar className="appBar" sx={{ position: 'static', background: 'var(--purple)' }}>
                <div className="signInDiv">
                    {user ? (<Button style={{ color: 'white', marginLeft: '2rem', border: '2px solid white' }} onClick={handleSignOut}>Sign Out</Button>) : (

                        <><Button style={{ color: 'white' }} onClick={() => dispatch(toggleSignupModal(true))}>Create Account</Button>
                            <Button style={{ color: 'white' }} onClick={() => dispatch(toggleSigninModal(true))}>Sign In</Button>
                        </>)
                    }

                </div>
                <Toolbar className="toolBar" >
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
                    <Link to="/recipients"><MenuItem onClick={closeMenu}>Manage Contacts</MenuItem></Link>
                    <Link to="/recipients"><MenuItem onClick={closeMenu}>Manage Contacts</MenuItem></Link>

                </MenuList>
            </Popover>
            <SignIn />
            <SignUp />


        </div>
    );
};

export default Header;