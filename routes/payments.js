//Import stripe
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_PK);

const express = require('express')
const router = express.Router()


module.exports = router

router.post('/', async (req, res) => {
    const {total} = req.body

    if(!total){
        return res.status(400).send("Please send a total")
    }

    //Else process paymentIntent.

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    })
    res.send({
        clientSecret: paymentIntent.client_secret
    })

})

//Can be extended by using carts to calculate totals.