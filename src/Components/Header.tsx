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

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuButton = document.getElementById('menuButton');
    const [user] = useAuthState(auth);

    let openMenuPopover: boolean = useSelector((state: any) => state.header.popoverState.mainMenu);

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

                        <> <Button style={{ color: 'white', marginLeft: '2rem', border: '2px solid white' }} onClick={() => dispatch(toggleSigninModal(true))}>Sign In</Button>
                            <Button style={{ color: 'white' }} onClick={() => dispatch(toggleSignupModal(true))}>Create Account</Button>

                        </>)
                    }

                </div>
                <Toolbar className="toolBar" >
                    <Button><MenuIcon id="menuButton" onClick={openMenu} /></Button>
                    <Link to='/' ><Typography variant="h3" sx={{ color: 'white', fontSize: '30px', fontWeight: '600', textShadow: '1px 1px black' }}>SOS Service</Typography><p>To Dashboard</p></Link>
                </Toolbar>
            </AppBar>
            <Popover id="menuPopover" open={openMenuPopover} anchorEl={menuButton} onClose={closeMenu}>
                <MenuList>
                    <Link to="/help"><MenuItem onClick={closeMenu}>How to use SOS</MenuItem></Link>
                    <Link to="/custommsg"><MenuItem onClick={closeMenu}>Customize Messages</MenuItem></Link>
                    <Link to='/profile'><MenuItem onClick={closeMenu}>Manage Profile</MenuItem></Link>
                    <Link to="/recipients"><MenuItem onClick={closeMenu}>Manage Contacts</MenuItem></Link>
                    <Link to="/signals"><MenuItem onClick={closeMenu}>Manage Signal Types</MenuItem></Link>
                    <Link to="/signalhistory"><MenuItem onClick={closeMenu}>View Signal History</MenuItem></Link>

                </MenuList>
            </Popover>
            <SignIn />
            <SignUp />


        </div>
    );
};

export default Header;