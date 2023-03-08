import React from 'react';
import { useSelector } from 'react-redux';

const Registration = () => {
    const userData = useSelector((state: any) => state.userSlice.userSlice);
    console.log(userData);



    // const sosUser: Guser = useSelector(selectSosUser)

    return (
        <div>
            <h1> to be used in future, so we dont restrict to just google authentication

            </h1>

        </div>
    );
};

export default Registration;