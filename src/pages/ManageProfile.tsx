import React from 'react';
import ProfileForm from '../Registration/ProfileForm';
import { Guser, Profile } from '../app/model';
import { useSelector } from 'react-redux';
import { useFetchProfileQuery, useSetProfileMutation } from '../app/services/firestoreAPI';


const ManageProfile = () => {

    const {
        data,
        isLoading, 
        error
    } = useFetchProfileQuery();
    
    const user = useSelector((state: any) => state.user.user);
    const profile = useSelector((state: any) => state.profile.userProfile);
    console.log(user); //debugging

    return (
        <div>
            <h1>Manage Profile</h1>

            {user.name === "" ? (<><p>Please sign in to view your profile</p>
            </>) : (<>
                <p>{`Hi ${user.name}`}</p>
            </>)

            }
<ProfileForm />

        </div>
    );
};

export default ManageProfile;