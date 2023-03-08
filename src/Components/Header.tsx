import '../styles/Header.css';
import { AppBar, Avatar, Toolbar, Typography, Stack, Button, Popover, MenuList, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { togglePopover } from '../features/headerSlice';
import { Link } from 'react-router-dom';
import { ClickAwayListener } from '@mui/base';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menuButton = document.getElementById('menuButton');
    let open = useSelector((state: any) => state.header.popoverState);

    function openMenu() {
        dispatch(togglePopover(true));
    }

    function handleClickAway() {
        dispatch(togglePopover(false));
    }

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