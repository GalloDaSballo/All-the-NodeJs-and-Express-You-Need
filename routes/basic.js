const express = require('express')
const router = express.Router()

module.exports = router

//Sendign text
router.get('/', (req, res) => { 
    console.log("Your first request")

    res.send("Hey, Wait! I got a new complain...")
})


//Sending HTML
router.get('/', (req, res) => {
    console.log("Your first request")

    res.send("<h2>Hey, Wait! I got a new complain...</h2>")
})

//Sending JSON
router.get('/', (req, res) => {
    console.log("Your first request")

    res.send({title: "Value"})
})

//What happens if you change app.get to app.post, app.put, etc..?

//How do you read JSON body?
//Sending JSON
router.post('/', (req, res) => {
    const {body} = req

    res.send(body)
})

