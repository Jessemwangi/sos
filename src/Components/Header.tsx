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
    let openMainMenu = useSelector((state: any) => state.header.popoverState.mainMenu);
    let openProfileMenu = useSelector((state: any) => state.header.popoverState.profileMenu);

    function openMenu(e: any) {
        dispatch(togglePopover({ [e.target.id]: true }));
        console.log(e.target.id);
    }

    function handleClickAway(popoverId: string) {
        dispatch(togglePopover({ popoverId: false }));
        //console.log(e.target.id);
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
                    <Link to='/'><Typography variant="h5" sx={{ color: 'white' }}>SOS Service</Typography></Link>
                    <Stack direction="row">
                        <Button><MenuIcon id="mainMenu" onClick={openMenu} /></Button>
                        <Button onClick={() => navigate('/')}>Dashboard</Button>
                        <Button onClick={() => navigate('/recipients')}>Manage Contacts</Button>
                        <Button><Avatar id="profileMenu" variant="rounded" onClick={openMenu} /></Button>
                        {sosUser.email !== "" ?
                            (<><Button id="signOutButton" onClick={() => dispatch(SignOut())}><img className="userImage" src={sosUser.picture} alt={sosUser.name} />Sign Out</Button>
                            </>)
                            : (
                                <Button id='signInDiv'></Button>
                            )}
                    </Stack>

                    <ClickAwayListener onClickAway={() => handleClickAway("mainMenu")}>
                        <Popover id="mainMenu" open={openMainMenu} anchorEl={menuButton}><MenuList>
                            <Link to="/help"><MenuItem>How to use SOS</MenuItem></Link>
                            <Link to=""><MenuItem>Custom Emergency Buttons</MenuItem></Link>
                            <Link to=""><MenuItem></MenuItem></Link>
                            <Link to=""><MenuItem></MenuItem></Link>
                        </MenuList>
                        </Popover>
                    </ClickAwayListener>

                    <ClickAwayListener onClickAway={() => handleClickAway("profileMenu")}>
                        <Popover id="profileMenu" open={openProfileMenu} anchorEl={menuButton}><MenuList>
                            <Link to='/pages/EditProfile'><MenuItem>Edit Profile</MenuItem></Link>
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