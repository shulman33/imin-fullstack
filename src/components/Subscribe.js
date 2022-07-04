import {loadStripe} from '@stripe/stripe-js';
import React from "react";
import Link from "@mui/material/Link";

export default function Subscribe() {
    const handleClick = async (e) => {
        const stipe = await loadStripe('pk_live_51LHViCE10R7clMGPE8vuPuyigHV2lFRBUa40PGjEJMiCztmySv5D1P2g1mStW2d6GLCS8Z0behHpB27r1IljYbZ9001Q0xK2bg');
        const {error} = await stipe.redirectToCheckout({
            lineItems: [{
                price: 'price_1LHW1gE10R7clMGPZrl1hT6o',
                quantity: 1
            }],
            mode: 'payment',
            successUrl: 'https://imin.site',
            // should act config this page
            cancelUrl: 'https://imin.site'
        })
    }
    return (
        // <button onClick={handleClick}>Sign Up</button>
        <Link onClick={handleClick} variant="body2" style={{cursor: 'pointer'}}>
            {"Don't have an account? Sign Up"}
        </Link>
    )
}