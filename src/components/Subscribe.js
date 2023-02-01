import {loadStripe} from '@stripe/stripe-js';
import React from "react";
import Link from "@mui/material/Link";
import Button from '@mui/material/Button';


export default function Subscribe() {
    const handleClick = async (e) => {
        // test api key
        // const stipe = await loadStripe('pk_test_51LHViCE10R7clMGPar467buonYNVnMYD3hpzm2FJ9V73TaQCdqm2w2bl5ymOXcepGaJaACc3fS0zLtSkGTqfTeyi00c3p5Z25Y');

        // live api key
        const stipe = await loadStripe('pk_live_51LHViCE10R7clMGPE8vuPuyigHV2lFRBUa40PGjEJMiCztmySv5D1P2g1mStW2d6GLCS8Z0behHpB27r1IljYbZ9001Q0xK2bg');

        const {error} = await stipe.redirectToCheckout({
            lineItems: [{
                // test price
                // price: 'price_1LHWT1E10R7clMGPqANHPWaw',

                // production price
                price: 'price_1MWlPcE10R7clMGPq8uZSsYJ',
                quantity: 1
            }],
            mode: 'subscription',
            successUrl: 'https://imin.site/resetpassword',
            // should act config this page
            cancelUrl: 'https://imin.site/'
        })
    }
    return (
        // <Link onClick={handleClick} variant="body2" style={{cursor: 'pointer'}}>
        //     {"Don't have an account? Sign Up"}
        // </Link>
        <Button
            onClick={handleClick}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Sign Up
        </Button>
    )
}