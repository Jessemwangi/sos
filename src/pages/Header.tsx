import '../styles/Header.css';
import { AppBar, Avatar, Toolbar, Typography, Stack, Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    return (
        <div className='header'>
            <AppBar className="appBar" position="static"><h1>Menu</h1>
                <Toolbar className="toolBar">
                    <Typography variant="h5">SOS Service</Typography>
                    <Stack direction="row">
                        <Button onClick={() => navigate('/')}>Dashboard</Button>
                        <Button onClick={() => navigate('/recipients')}>Manage Contacts</Button>

                    </Stack>

                    <Avatar variant="rounded" />
                </Toolbar>
            </AppBar>

        </div>
    );
};

export default Header;