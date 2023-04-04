import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import {
    Button,
    TextField,
    Typography,
    Box,
    Container,
    Paper,
} from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
}));

const FormTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const FormField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const SuccessMessage = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const CustomerFeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [messageSent, setMessageSent] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        emailjs
            .sendForm(
                'service_bopwkgh',
                'template_sth469u',
                event.target,
                'tRjVSlMQP1gGhp6-x',
            )
            .then(
                () => {
                    setMessageSent(true);
                    setName('');
                    setEmail('');
                    setFeedback('');
                },
                (error) => {
                    console.error('Failed to send feedback:', error);
                },
            );
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3}>
                <FormContainer component="form" onSubmit={handleSubmit}>
                    <FormTitle variant="h4" component="h2">
                        Customer Feedback and Support
                    </FormTitle>
                    {messageSent && (
                        <SuccessMessage color="success.main">
                            Your feedback has been sent! Thank you.
                        </SuccessMessage>
                    )}
                    <FormField
                        label="Feedback"
                        variant="outlined"
                        value={feedback}
                        onChange={(event) => setFeedback(event.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        required
                        name="feedback"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Send Feedback
                    </Button>
                </FormContainer>
            </Paper>
        </Container>
    );
};

export default CustomerFeedbackForm;
