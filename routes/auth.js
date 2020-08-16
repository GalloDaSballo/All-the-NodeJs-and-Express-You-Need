const express = require('express')
const router = express.Router()

module.exports = router

const passport = require('../auth')
const db = require('../db')
const crypto = require('crypto')

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    console.log("req.user", req.user)

    res.send("OK")
    res.redirect("/") //Add this so it redirects after auth for templating stuff
});

router.post('/me',
    function(req, res) {
    console.log("req.user", req.user)

    const {user} = req

    res.send(user)
});

router.post('/register', async (req, res) => {
    const {email, password} = req.body

    if(!email){
        return res.status(400).send("Please use email")
    }

    if(!password){
        return res.status(400).send("Please use password")
    }

    //CREDITS TO https://github.com/vercel/next.js/blob/canary/examples/with-passport/lib/user.js
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    
    //Check if user doesn't already exists
    const already = await db('users').where({ email: email }).first()
    if(already){
        return res.status(400).send("User already exists")
    }

    const insert = await db('users').insert({email, password: hash}).returning(['id', 'email'])

    res.send(insert)
})