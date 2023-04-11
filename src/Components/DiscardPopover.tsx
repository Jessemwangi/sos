import React from 'react';
import { Button, Dialog, Typography } from '@mui/material';

interface Props {
    yesHandler: any,
    noHandler: any,
    deletePopoverOpen: boolean,
    closeHandler: any

}

const DiscardPopover = ({ yesHandler, noHandler, deletePopoverOpen, closeHandler }: Props) => {
    return (
        <Dialog
            open={deletePopoverOpen}
            onClose={closeHandler}
            PaperProps={{
                sx: {
                    height: '150px'
                }
            }}
        >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Confirm Delete
            </Typography>
            <div>
                <p>Are you sure you want to delete this entry?</p>
                <Button onClick={yesHandler}>Yes</Button>
                <Button onClick={noHandler}>No</Button>
            </div>

        </Dialog>

    );
};

export default DiscardPopover;