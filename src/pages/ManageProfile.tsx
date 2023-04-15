import React from 'react';
import ProfileForm from '../registration/ProfileForm';
import { auth } from '../app/services/FirebaseAuth';
import { useAuthState } from "react-firebase-hooks/auth";

const ManageProfile = () => {

    const [user] = useAuthState(auth);

    if (!user) { return <><h3>Please log in first to manage your profile.</h3></> }

    return (
        <div style={{ padding: '2rem' }}>    <ProfileForm /></div>

    );
};

export default ManageProfile;