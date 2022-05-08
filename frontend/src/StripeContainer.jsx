import React, {Fragment, useEffect, useState} from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import Payment from './component/Cart/Payment';
import Loader from './component/layout/Loader/Loader';

const StripeContainer = () => {

    const [stripeApiKey, setStripeKey] = useState(undefined)

    async function getStripeApiKey() {
        const { data } = await axios.get('/api/v1/stripeapikey')
        setStripeKey(data.stripeApiKey)
    }

    useEffect(async ()=>{
        getStripeApiKey()
    },[])

    return <Fragment>
        {!stripeApiKey ? <Loader/> : 
        <Elements stripe={loadStripe(stripeApiKey)}>
            <Payment/>
        </Elements>
    }</Fragment>
}

export default StripeContainer