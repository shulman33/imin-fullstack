import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Button, Container, Grid, Box, Card, CardContent} from '@mui/material';
import { styled } from '@mui/system';
import dateNTime from '../assests/date-and-time.gif'
import logo from '../assests/the-logo-transparent.png'
import crns from '../assests/crns.gif'
import screenshot from '../assests/screenshot.gif'
import {useNavigate} from "react-router-dom";
import { Rating } from '@mui/lab';
import { useMediaQuery } from '@mui/material';
import ScrollTrigger from 'react-scroll-trigger'
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';




const Root = styled('div')(({ theme }) => ({
    minHeight: '100vh',
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


const MainSection = styled(Box)(({ theme }) => ({
    height: '100vh',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: '#330000',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23146CDD'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FFFFFF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FFFFFF' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
    color: '#ffffff',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    color: '#ffffff',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
}));

const HowItWorksSection = styled(Box)(({ theme }) => ({
    height: '100vh',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: '#EEEEEE',

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

const PricingSection = styled(Box)(({ theme }) => ({
    height: '100vh',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23146CDD'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FFFFFF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FFFFFF' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
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

const ReviewRating = styled(Rating)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
}));


const ReviewCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const ReviewerName = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
}));

const ReviewText = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

const FeaturedReviewsSection = styled(Typography)(({ theme }) => ({
    color: '#ffffff',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
}));





function LandingPage() {
    const matches = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const titleColor = matches ? '#e0f0ff' : '#ffffff';
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    const onEnter = () => {
        setIsVisible(true);
    };

    const onExit = () => {
        setIsVisible(false);
    };

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <Root>
            <Header position="static">
                <ToolbarContainer maxWidth="lg">
                    <Toolbar disableGutters>
                        <Box display="flex" flexGrow={1} alignItems="center">
                            <img src={logo} alt="Logo" style={{ height: '70px', marginRight: '16px' }} />
                        </Box>
                        <Button color="primary" variant="outlined" onClick={handleLogin}>
                            Log in
                        </Button>
                    </Toolbar>
                </ToolbarContainer>
            </Header>
            <MainSection>
                <Container maxWidth="lg">
                    <Grid container spacing={4} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Title variant="h3" component="h1" style={{ color: titleColor }}>
                                Register for Yeshiva University classes faster than ever
                            </Title>
                            <Subtitle variant="h6" component="p" style={{ color: titleColor }}>
                                Be the student who got that last spot. Don't miss out on the courses you need register in approximately one second or less!
                            </Subtitle>
                            <Button variant="contained" color="secondary" size="large" onClick={handleLogin}>
                                Get Started
                            </Button>
                        </Grid>
                        {!matches && (
                            <Grid item xs={12} md={6}>
                                <FeaturedReviewsSection variant="h4" component="h3" mb={2} style={{ color: titleColor }}>
                                    Featured Reviews
                                </FeaturedReviewsSection>
                                <ReviewCard>
                                    <CardContent>
                                        <Box display="flex" alignItems="center">
                                            <ReviewerName variant="h6">Josh Matthew</ReviewerName>
                                            <ReviewRating value={5} readOnly />
                                        </Box>
                                        <ReviewText>
                                            "I needed to get into David Puretz's First Year Writing for an easy A, and ImIn was able to get me into his class when there was only one spot remaining!"
                                        </ReviewText>
                                    </CardContent>
                                </ReviewCard>
                                <ReviewCard>
                                    <CardContent>
                                        <Box display="flex" alignItems="center">
                                            <ReviewerName variant="h6">Taylor Dinar</ReviewerName>
                                            <ReviewRating value={5} readOnly />
                                        </Box>
                                        <ReviewText>
                                            "It was my last semester and I had to finish my Jewish Cores and I was able to get into all of them with ImIn."
                                        </ReviewText>
                                    </CardContent>
                                </ReviewCard>
                                <ReviewCard>
                                    <CardContent>
                                        <Box display="flex" alignItems="center">
                                            <ReviewerName variant="h6">Sammy Mayer</ReviewerName>
                                            <ReviewRating value={5} readOnly />
                                        </Box>
                                        <ReviewText>
                                            "I had to get into R' Feldman's Jewish Public Policy class, and ImIn made it happen."
                                        </ReviewText>
                                    </CardContent>
                                </ReviewCard>
                            </Grid>
                        )}
                    </Grid>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="flex-end"
                        height="100%"
                        paddingTop={10}
                    >
                        <IconButton
                            color="secondary"
                            onClick={() => {
                                window.scrollTo({
                                    top: document.documentElement.clientHeight,
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            <KeyboardArrowDownIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Container>
            </MainSection>
            {!matches ? (
                <ScrollTrigger onEnter={onEnter} onExit={onExit}>
                    <HowItWorksSection style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s' }}>
                        <Container maxWidth="lg">
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
                                        If you do not know your pin please follow the reset pin instructions found <a href='https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu'>here</a>.
                                    </StepDescription>
                                </StepContainer>

                                <StepContainer item xs={12} md={4}>
                                    <StepImage src={crns} alt="Step 2" />
                                    <StepTitle variant="h6" component="h3">
                                        Step 2: Enter Crns
                                    </StepTitle>
                                    <StepDescription>
                                        If you know the CRNs you want to register for, enter up to 6 CRNs, or search for CRNs using the search bar.
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
                        </Container>
                    </HowItWorksSection>

                </ScrollTrigger>
            ):(
                <HowItWorksSection>
                    <Container maxWidth="lg">
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
                                    If you do not know your pin please follow the reset pin instructions found <a href='https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu'>here</a>.
                                </StepDescription>
                            </StepContainer>

                            <StepContainer item xs={12} md={4}>
                                <StepImage src={crns} alt="Step 2" />
                                <StepTitle variant="h6" component="h3">
                                    Step 2: Enter Crns
                                </StepTitle>
                                <StepDescription>
                                    If you know the CRNs you want to register for, enter up to 6 CRNs, or search for CRNs using the search bar.
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
                    </Container>
                </HowItWorksSection>
            )}


            {!matches && (
                <ScrollTrigger onEnter={onEnter} onExit={onExit}>
                    <PricingSection style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s' }}>
                        <Container maxWidth="lg">
                            <Typography variant="h4" component="h2" textAlign="center" mb={6} color='#ffffff'>
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
                        </Container>
                    </PricingSection>
                </ScrollTrigger>
            )}



        </Root>
    );
}

export default LandingPage;
