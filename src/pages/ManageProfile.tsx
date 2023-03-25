import React, { useContext } from 'react';
import ProfileForm from '../Registration/ProfileForm';
import { Profile } from '../app/model';
import { useSelector } from 'react-redux';
import { AuthContext } from '../app/services/FirebaseContext';
//import { CreateDocSetId } from "../app/services/DbFunctions";
//import { useFetchProfileQuery, useSetProfileMutation } from '../app/services/firestoreAPI';


const ManageProfile = () => {

    const sosUser = useSelector((state: any) => state.user.sosUser);
    const user = useContext(AuthContext);


    return (
        <div>
            <h1>Manage Profile</h1>

            {!user ? (<><p>Please sign in first or create an account to view your profile</p>
            </>) : (<>
                <p>{`Hi ${sosUser.name}`}</p>
            </>)

            }
            <ProfileForm />

        </div>
    );
};

export default ManageProfile;