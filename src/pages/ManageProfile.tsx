import React from 'react';
import ProfileForm from '../Registration/ProfileForm';
import { Guser, Profile } from '../app/model';
import { useSelector } from 'react-redux';
import { useSetProfileMutation } from '../app/services/firestoreAPI';


const ManageProfile = () => {
    
    const user = useSelector((state: any) => state.user.user);
  
    return (
        <div>
            <h1>Manage Profile</h1>

            {user.uid === "" ? (<><p>Please sign in first or create an account to view your profile</p>
            </>) : (<>
                <p>{`Hi ${user.name}`}</p>
            </>)

            }
<ProfileForm />

        </div>
    );
};

export default ManageProfile;