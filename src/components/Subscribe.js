import {loadStripe} from '@stripe/stripe-js';
import React from "react";
import Link from "@mui/material/Link";


export default function Subscribe() {
    const handleClick = async (e) => {
        const stipe = await loadStripe('pk_test_51LHViCE10R7clMGPar467buonYNVnMYD3hpzm2FJ9V73TaQCdqm2w2bl5ymOXcepGaJaACc3fS0zLtSkGTqfTeyi00c3p5Z25Y');
        // live api key
        // const stipe = await loadStripe('pk_live_51LHViCE10R7clMGPE8vuPuyigHV2lFRBUa40PGjEJMiCztmySv5D1P2g1mStW2d6GLCS8Z0behHpB27r1IljYbZ9001Q0xK2bg');
        const {error} = await stipe.redirectToCheckout({
            lineItems: [{
                price: 'price_1LHWT1E10R7clMGPqANHPWaw',
                // production price
                // price: 'price_1LHW1gE10R7clMGPZrl1hT6o',
                quantity: 1
            }],
            mode: 'payment',
            successUrl: 'http://localhost:3000/resetpassword',
            // should act config this page
            cancelUrl: 'http://localhost:3000/'
        })
    }
    return (
        <Link onClick={handleClick} variant="body2" style={{cursor: 'pointer'}}>
            {"Don't have an account? Sign Up"}
        </Link>
    )
}