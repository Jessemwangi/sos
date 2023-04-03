import React, {  useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Box, Container, Toolbar, Paper, Stepper, Step, StepLabel, Button, Typography , LinearProgress} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ForumIcon from '@mui/icons-material/Forum';
import SosIcon from '@mui/icons-material/Sos';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ProfileForm from '../Registration/ProfileForm';
import RecipientEntryForm from '../Registration/RecipientEntryForm';
import CustomTextForm from '../Registration/CustomTextEntryForm';
import CustomSignals from '../Registration/CustomSignals';
import WrapUp from '../Registration/WrapUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/services/FirebaseAuth';


const steps = [
  { name: 'Biography', icon: <PersonAddIcon />, },
  { name: 'Recipients', icon: <GroupAddIcon />, },
  { name: 'Custom Text', icon: <ForumIcon />, },
  { name: 'Custom Signals', icon: <SosIcon />, },
  { name: 'Wrap Up', icon: <AssignmentTurnedInIcon />, }
];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <ProfileForm />;
    case 1:
      return <RecipientEntryForm />;
    case 2:
      return <CustomTextForm />;
    case 3:
      return <CustomSignals />;
    case 4:
      return <WrapUp />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

const CompleteReg = () => {

  const [user, loading, error] = useAuthState(auth);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!user ? (<h1>Please create an account with SOS service before completing registration</h1>
      ) : (
        <><AppBar
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
              Hi {user.displayName}, finish setting up your account by providing the following information.
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
                    Your profile has been created successfully and your SOS service is now ready to use. Be sure to read our 'How To' page for further information.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
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
        </>)}
    </ThemeProvider>
  );
};

export default CompleteReg;
