import { Popover } from '@mui/material';
import React from 'react';
import { recipients } from './recipients.js';
import EditIcon from '@mui/icons-material/Edit';

const ManageRecipients = () => {
    let recipientArray = recipients;

    function editHandler() {
        //TODO: edit function opens popover
        console.log('edit');
    }

    function closeHandler() {
        console.log('close');
    }

    return (
        <div>
            <table><tbody>
                {recipientArray.map((item) => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.phone_number}</td>
                        <td><EditIcon onClick={editHandler} /></td>
                    </tr>)
                )
                }
            </tbody>
            </table>

            <Popover
                id='contactDetails'
                open={false}
                onClose={closeHandler} />
        </div>
    );
};

export default ManageRecipients;