import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Popover, MenuList, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import jwtDecode from 'jwt-decode';

import { signIn, signOut, selectUser } from '../features/userSlice';
import { togglePopover, closePopover } from '../features/headerSlice';
import { Guser } from '../app/model';
import '../styles/Header.css';


const Header = () => {
    const dispatch = useDispatch();
    const CLIENT_ID = '127054368864-db825ognn1j3bdg4rl224ums2j7k2g07';
    const menuButton = document.getElementById('menuButton');
    const sosUser: Guser = useSelector(selectUser);
    let openMenuPopover = useSelector((state: any) => state.header.popoverState.mainMenu);

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


    useEffect(() => {
        const handleCallback = (response: any) => {
            const userSignObject: any = jwtDecode(response.credential);

            const userObject: Guser = {
                name: userSignObject.family_name + ' ' + userSignObject.given_name,
                email: userSignObject.email,
                picture: userSignObject.picture,
                iat: userSignObject.iat,
                iss: userSignObject.iss,
                jti: userSignObject.jti,
                sub: userSignObject.sub
            }

            dispatch(signIn(userObject));
        }


        window.google.accounts.id.initialize({
            client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
            callback: handleCallback,
            cancel_on_tap_outside: true
        });

        const signInButton = document.getElementById('signInButton')!;

        google.accounts.id.renderButton(
            signInButton,
            {
                theme: "outline",
                size: "large",
                type: "standard"
            })
    }, [dispatch]);

    return (
        <div className='header'>
            <AppBar className="appBar" sx={{ position: 'static' }}>
                <div className='signInDiv'>
                    {sosUser.email !== "" ? (<><Button id="signOutButton" onClick={() => dispatch(signOut())}>
                        <img className="userImage" src={sosUser.picture} alt={sosUser.name} />Sign Out</Button></>
                    ) : (<><Button id='signInButton'></Button></>)}
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
                    <Link to="/register"><MenuItem onClick={closeMenu}>Register</MenuItem></Link>
                    <Link to="/recipients"><MenuItem onClick={closeMenu}>Manage Contacts</MenuItem></Link>
                </MenuList>
            </Popover>
        </div>
    );
};

export default Header;