import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Popover, MenuList, MenuItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import jwtDecode from 'jwt-decode';

import { signIn, signOut } from '../features/userSlice';
import { togglePopover, closePopover, toggleSignupModal, toggleSigninModal } from '../features/headerSlice';
import { Guser } from '../app/model';
import {googleSignIn, signInUser, createAccount, signOutUser} from '../app/services/firebaseAuth';
import '../styles/Header.css';

//const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_ID = '127054368864-db825ognn1j3bdg4rl224ums2j7k2g07';
console.log(GOOGLE_CLIENT_ID);

const Header = () => {
    const dispatch = useDispatch();
    const menuButton = document.getElementById('menuButton');
    const user: Guser = useSelector((state: any) => state.user.user);
    let openMenuPopover = useSelector((state: any) => state.header.popoverState.mainMenu);
    const signinModal = useSelector((state:any)=> state.header.signinModal)
    const signupModal = useSelector((state:any)=> state.header.signupModal)
    console.log(signinModal);//debugging


    const emailField = useRef('email');
    const passwordField = useRef('password');
console.log(emailField.current)

const sxStyles = {
    position: 'static',
    height: '20vh'
}

    function handleSubmit(e:any){
        e.prevent.default();
        console.log('submitted')//debugging
    }

    function openMenu(e: any) {
        dispatch(togglePopover({ mainMenu: true }));
    }

    function closeMenu(e: any) {
        dispatch(closePopover({ mainMenu: false }));

    }

    function googleButtonHandler() {
        console.log('google button handler side effect, optional')
    }

    function handleSignIn(){
     /*    dispatch()
    signInUser(); */

        } 
        

    function handleRegister(){}

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
            client_id: `${GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
            callback: handleCallback,
            cancel_on_tap_outside: true
        });

        const signInButton = document.getElementById('signInButton')!;

        google.accounts.id.renderButton(
            signInButton,
            {
                theme: "outline",
                size: "large",
                type: "standard",
                click_listener: googleButtonHandler
            })
    }, [dispatch]);

    return (
        <div className='header'>
            <AppBar className="appBar" sx={{ position: 'static' }}>
                <div className='signInDiv'>
                    <div>
                        <Button id='signInButton' className={`app ${user.email !== null ? "noDisplay" : ""}`}></Button>
                        <Button id="signOutButton" className={`app ${user.email === null ? "noDisplay" : ""}`} onClick={() => dispatch(signOut())}>
                            <img className="userImage" src={user.picture} alt={user.name} />Sign Out</Button>
                    </div>
                    <div>
                      <Button style={{ color: 'white' }} onClick={() => dispatch(toggleSignupModal(true))}>Create Account</Button>
                      {/*   <Button style={{ color: 'white' }} onClick={handleRegister}>Create Account</Button> */}
                      
                      <Button style={{ color: 'white' }} onClick={() => dispatch(toggleSigninModal(true))}>Sign In</Button>
                   {/*    <Button style={{ color: 'white' }} onClick={handleSignIn}>Sign In</Button> */}
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
            open={signupModal}
            onClose={()=>dispatch(toggleSignupModal(false))}
            aria-labelledby="modal-register"
            aria-describedby="modal-modal-description">
                <DialogTitle>Sign Up with Email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a valid email address and create a password for your account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
           inputRef={emailField}
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
            inputRef={passwordField}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
            </Dialog>
            
            <Dialog
            open={signinModal}
            onClose={()=> dispatch(toggleSigninModal(false))}
            aria-labelledby="modal-register"
            aria-describedby="modal-modal-description">
                <DialogTitle>Sign In with Email</DialogTitle>
                <DialogContent>
          <DialogContentText>Enter your account email and password</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
           inputRef={emailField}
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
            inputRef={passwordField}
          />

          </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
            </Dialog>




        </div>
    );
};

export default Header;