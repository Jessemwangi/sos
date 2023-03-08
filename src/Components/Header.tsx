import '../styles/Header.css';
import { AppBar, Avatar, Toolbar, Typography, Stack, Button, Popover, MenuList, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { togglePopover } from '../features/headerSlice';
import { Link } from 'react-router-dom';
import { ClickAwayListener } from '@mui/base';
import { SignIn, SignOut, selectSosUser } from '../features/userSlice';
import { Guser } from '../app/model';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menuButton = document.getElementById('menuButton');
    const sosUser: Guser = useSelector(selectSosUser)
    let open = useSelector((state: any) => state.header.popoverState);

    function openMenu() {
        dispatch(togglePopover(true));
    }

    function handleClickAway() {
        dispatch(togglePopover(false));
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
          jti: userSignObject.jti
        }
  
        dispatch(SignIn(userObject));
      }
  
      window.google.accounts.id.initialize({
        client_id: "127054368864-db825ognn1j3bdg4rl224ums2j7k2g07.apps.googleusercontent.com",
        callback: handleCallback
      });
  
      const SignInButton = document.getElementById('signInDiv')!;
      google.accounts.id.renderButton(
        SignInButton,
        {
          theme: "outline",
          size: "large",
          type: "standard"
        })
    }, [dispatch]);

    return (
        <div className='header'>
            <AppBar className="appBar" position="static"><h1>Menu</h1>
                <Toolbar className="toolBar">

                    <Link to='/'><Typography variant="h5" sx={{color: 'white'}}>SOS Service</Typography></Link>
                    <Stack direction="row">
                        <Button onClick={() => navigate('/')}>Dashboard</Button>
                        <Button onClick={() => navigate('/recipients')}>Manage Contacts</Button>
                        <Button id="menuButton" onClick={openMenu}><MenuIcon /></Button>
                        <Button><Avatar variant="rounded" onClick={() => navigate('/profile')} /></Button>
                        {sosUser.email ?
        (<>
          <img src={sosUser.picture} alt={sosUser.name} />
          <button id="signOutButton" onClick={() => dispatch(SignOut())}>
            Sign Out</button>
        </>)
        : (
          <div id='signInDiv'></div>
        )}
                    </Stack>

                    <ClickAwayListener onClickAway={handleClickAway}>
                        <Popover open={open} anchorEl={menuButton}><MenuList>
                            <Link to="/help"><MenuItem>How to use SOS</MenuItem></Link>
                            <Link to=""><MenuItem>Custom Emergency Buttons</MenuItem></Link>
                            <Link to=""><MenuItem></MenuItem></Link>
                            <Link to=""><MenuItem></MenuItem></Link>
                        </MenuList>
                        </Popover>
                    </ClickAwayListener>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;