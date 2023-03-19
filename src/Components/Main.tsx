import { Outlet } from 'react-router-dom';
import { Dialog } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import "../styles/Main.css";
import React from 'react';
import { toggleSigninModal, toggleSignupModal } from '../features/headerSlice';


const Main = () => {
    const dispatch = useDispatch();
    let signinModal = useSelector((state:any)=> state.header.signinModal)
    let signupModal = useSelector((state:any)=> state.header.signupModal)


    return (
        <div className="main">
            <Outlet />
<Dialog
  open={signinModal}
  onClose={()=> dispatch(toggleSigninModal)}
  aria-labelledby="modal-register"
  aria-describedby="modal-modal-description"
>
 
</Dialog>

<Dialog
  open={signupModal}
  onClose={()=> dispatch(toggleSignupModal)}
  aria-labelledby="modal-register"
  aria-describedby="modal-modal-description"
>
</Dialog>



        </div>
    );
};

export default Main;