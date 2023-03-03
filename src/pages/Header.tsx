import '../styles/Header.css';
import { AppBar, Avatar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';


const Header = () => {
    return (
        <div className='header'>
            <AppBar className="appBar"><h1>Menu</h1>
                <Toolbar className="toolBar">
                    <Typography>Dashboard</Typography>
                    <Typography>Contacts</Typography>
                    <Avatar variant="rounded" />
                </Toolbar>
            </AppBar>

        </div>
    );
};

export default Header;