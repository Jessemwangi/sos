import React from 'react';
import { useSelector } from "react-redux";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ForumIcon from '@mui/icons-material/Forum';
import SosIcon from '@mui/icons-material/Sos';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegistrationForm from './RegistrationForm';
import PaymentForm from './RecipientEntryForm';
import CustomTextForm from './CustomTextEntryForm';
import { selectSosUser } from '../features/userSlice';
import { Guser } from '../app/model';
import CustomeSignals from './CustomSignals';
import WrapUp from './WrapUp';
// import { selectProfile } from '../features/Profile';
// import { saveProfile } from '../features/Profile';

const steps = [
  { name: 'Biography', icon: <PersonAddIcon />, }
  , { name: 'Recipients', icon: <GroupAddIcon />, },
  { name: 'Custom Text', icon: <ForumIcon />, },
  { name: 'Custom Signals', icon: <SosIcon />, },
  { name: 'Wrap Up', icon: <AssignmentTurnedInIcon />, }];
  
  function getStepContent(step:number, sosUser:Guser) {
    switch (step) {
      case 0:

        return <RegistrationForm sosUser={sosUser} />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <CustomTextForm />;
        case 3:
        return <CustomeSignals />;
        case 4:
          return <WrapUp />;
      default:
        throw new Error('Unknown step');
    }
  }
  
  const theme = createTheme();

const CompleteReg = () => {
  const sosUser: Guser = useSelector(selectSosUser)

    const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
  
      setActiveStep(activeStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              HI {sosUser.name || ' Guest'}, Let get you set up and ready with few steps
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Profile
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label.name}>
                  <StepLabel>{label.icon}{label.name} </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for registering with sos online service.
                </Typography>
                <Typography variant="subtitle1">
                  Your Profile has been created successfull you can now start sending SOS and also recieving them to help yuor friend when in need
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                 {getStepContent(activeStep,sosUser)} 
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
         
        </Container>
      </ThemeProvider>
    );
};

export default CompleteReg;
