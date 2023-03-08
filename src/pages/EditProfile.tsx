import React from 'react';
import RegistrationForm from '../Registration/RegistrationForm';
/* import { Guser, Profile } from '../app/model'; */
import { useSelector } from 'react-redux';

/* interface googleUser {
    sosUser: Guser
} */

const EditProfile = () => {
    const sosUser = useSelector((state: any) => state.userSlice.user);
    return (
        <div>
            <h1>Manage Profile</h1>
            <RegistrationForm sosUser={sosUser} />

        </div>
    );
};

export default EditProfile;