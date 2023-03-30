import React from 'react';
import {AppBar, Toolbar, Typography, Button, Container, Grid, Box, Card, CardContent} from '@mui/material';
import { styled } from '@mui/system';
import landingPageIllustration from '../assests/ImIn-logos/ImIn-logos_black.png'
import dateNTime from '../assests/date-and-time.gif'
import crns from '../assests/crns.gif'
import screenshot from '../assests/screenshot.gif'
import {useNavigate} from "react-router-dom";


const Root = styled('div')(({ theme }) => ({
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(to bottom right, #29539B, #ffffff, #29539B)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}));

const Header = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ToolbarContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
}));

const MainSection = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: '#ffffff',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    color: '#ffffff',
}));

const CTAButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const HowItWorksSection = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
}));

const StepContainer = styled(Grid)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(4),
}));

const StepImage = styled('img')({
    maxWidth: '100%',
});

const StepTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
}));

const StepDescription = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const PricingSection = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
}));

const PricingCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const PriceTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
}));

const PriceAmount = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '2rem',
    marginBottom: theme.spacing(2),
}));

const PriceDescription = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));



function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <Root>
            <Header position="static">
                <ToolbarContainer maxWidth="lg">
                    <Toolbar disableGutters>

                        <Box flexGrow={1} />
                        <Box>
                            <Button color="primary" variant="outlined" onClick={handleLogin}>
                                Log in
                            </Button>
                        </Box>
                    </Toolbar>
                </ToolbarContainer>
            </Header>
            <MainSection maxWidth="lg">
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Title variant="h3" component="h1">
                            Register for Yeshiva University classes faster than ever
                        </Title>
                        <Subtitle variant="h6" component="p">
                            Be the student who got that last spot. Don't miss out on the courses you need register in approximately one second or less!
                        </Subtitle>
                        <CTAButton variant="contained" size="large" onClick={handleLogin}>
                            Get started
                        </CTAButton>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={landingPageIllustration}
                            alt="Yeshiva Class SpeedReg"
                            width="100%"
                        />
                    </Grid>
                </Grid>
            </MainSection>
            <HowItWorksSection maxWidth="lg">
                <Typography variant="h4" component="h2" textAlign="center" mb={6}>
                    How it Works
                </Typography>
                <Grid container spacing={6} justifyContent="center">
                    <StepContainer item xs={12} md={4}>
                        <StepImage src={dateNTime} />
                        <StepTitle variant="h6" component="h3">
                            Step 1: Enter Registration Info
                        </StepTitle>
                        <StepDescription>
                            Enter your 800 number, Banner Pin, and the date and time of your registration.
                            If you do not know your pin please follow the reset pin instructions found <a href='https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu'>here</a> .
                        </StepDescription>
                    </StepContainer>
                    <StepContainer item xs={12} md={4}>
                        <StepImage src={crns} alt="Step 2" />
                        <StepTitle variant="h6" component="h3">
                            Step 2: Enter Crns
                        </StepTitle>
                        <StepDescription>
                            Enter up to 6 CRNs and optionally enter backup CRNs in the event there is a problem with the CRN you entered above it.
                        </StepDescription>
                    </StepContainer>
                    <StepContainer item xs={12} md={4}>
                        <StepImage src={screenshot} alt="Step 3" />
                        <StepTitle variant="h6" component="h3">
                            Step 3: Wait for the Screenshot
                        </StepTitle>
                        <StepDescription>
                            As soon as registration opens, ImIn will quickly register you for your chosen classes then display a screenshot of the registration page.
                        </StepDescription>
                    </StepContainer>
                </Grid>
            </HowItWorksSection>
            <PricingSection maxWidth="lg">
                <Typography variant="h4" component="h2" textAlign="center" mb={6}>
                    Pricing
                </Typography>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={6}>
                        <PricingCard>
                            <CardContent>
                                <PriceTitle variant="h6" component="h3">
                                    ImIn Pro
                                </PriceTitle>
                                <PriceAmount>$19.99 / semester</PriceAmount>
                                <PriceDescription>
                                    Get instant access to class registration and secure your desired classes with ease.
                                </PriceDescription>
                                <Button variant="contained" color="secondary" size="large" onClick={handleLogin}>
                                    Get Started
                                </Button>
                            </CardContent>
                        </PricingCard>
                    </Grid>
                </Grid>
            </PricingSection>
        </Root>
    );
}

export default LandingPage;
