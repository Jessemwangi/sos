import React from 'react';
import ProfileForm from '../registration/ProfileForm';
import { auth } from '../app/services/FirebaseAuth';
import { useAuthState } from "react-firebase-hooks/auth";
import { Typography } from '@mui/material';

const ManageProfile = () => {

    const [user] = useAuthState(auth);

    if (!user) {
        return (<Typography component="h2" variant="h6" color="primary" gutterBottom>Please sign in to manage your profile</Typography>)
    }

    return (
        <div style={{ padding: '2rem' }}>    <ProfileForm /></div>

    );
};

export default ManageProfile;