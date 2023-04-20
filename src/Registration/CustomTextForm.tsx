import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, TextField, Button, Box, TextareaAutosize } from '@mui/material';
import { doc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from "react-toastify"
import { db } from '../dataLayer/FirestoreInit';
import { CustomText } from '../app/model';
import { auth } from '../app/services/FirebaseAuth';
import { customTextApi, setCustomText, resetForm } from '../features/customTextSlice';

export default function CustomTextForm() {

  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const dispatch = useDispatch();
  const [buttonAction] = useState<string>('Save Text')
  const [readyState, setReadyState] = useState<boolean>(false);

  const customText: CustomText = useSelector((state: any) => state.customText.customText)

  const titleInput = useRef<HTMLInputElement>();
  const messageInput = React.useRef<HTMLTextAreaElement>(null)

  function handleChange(e: any) {

    dispatch(setCustomText({ [e.target.name]: e.target.value }))
    if (readyState === true) { setReadyState(false) }
  }

  function completeData() {
    if (!titleInput.current!.value || !messageInput.current!.value) {
      alert("Some fields are missing data");
      return null;
    } else {
      dispatch(setCustomText({ uid: uid, id: uuidv4() }));
      setReadyState(true);
    }
  }

  async function handleSubmit() {
    completeData();
  }

  async function sendData() {
    if (customText.id) {
      let docRef = doc(db, 'customTexts', `${customText.id}`);
      await setDoc(docRef, {
        id: customText.id,
        message: customText.message,
        title: customText.title,
        uid: customText.uid,
        default: customText.default
      }, { merge: true })
        .then(() => toast.success("Message created successfully!"))
        .catch((err) => alert(err));
      //dispatch(resetForm());
      setReadyState(false)
      dispatch(resetForm());
    }
  }

  useEffect(() => {
    sendData();
    dispatch(customTextApi.util.invalidateTags(['Messages']))
    //eslint-disable-next-line
  }, [readyState])

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" padding={3} color="primary" textAlign={"left"}>
        Add Customized Text
      </Typography>

      <Grid container rowSpacing={3} padding={2} direction={"column"} display={"flex"}>
    
          <TextField
          required
          sx={{mt:2}}
            id="title"
            name="title"
            label="Title"
            inputRef={titleInput}
            defaultValue={customText.title}
            fullWidth
            autoComplete="cc-title"
            variant="standard"
          onChange={handleChange}
          />
        <Box sx={{ mt: 4 }}
        >
          
          <TextareaAutosize
               style={{ width: '98%', height: '250px' }}
            required
            id="message"
            name="message"
            maxRows={6}
            defaultValue={customText.message}
            /*  inputProps={{ maxLength: '160' }} */
            ref={messageInput}
            autoComplete="cc-Message"
            onChange={handleChange}
          />
</Box>



          <Button  
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 8, ml: 1 }}
          >
            {buttonAction}
          </Button>
        </Grid>
    </React.Fragment>
  );
}