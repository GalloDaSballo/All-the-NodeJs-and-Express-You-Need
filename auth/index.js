const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const crypto = require('crypto')

const db = require('../db')

//Rules to encrypt
passport.serializeUser((user, done) => {
    console.log("passport.serializeUser")
    done(null, user.id);
});

//And decrypt user
passport.deserializeUser(async (id, done) => {
    console.log("passport.deserializeUser")
    try{
        const user = await db('users').where({id}).first()
        const {email} = user
        done(null, {id, email})
    } catch(err){
        done(err,null)
    }
    
})



//Implementation of LocalStrategy for our app
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function(username, password, done) {
        console.log("Going in db username", username)
        const user = await db('users').where({ email: username }).first()
        console.log("user", user)
        if (!user) return done(null, false, { message: 'Incorrect email or password'});

        //TODO: Verify Pass
        const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
        const passwordsMatch = user.password === hash

        if(!passwordsMatch){
            return done(null, false, { message: 'Incorrect email or password'}) //Never say which one is wrong to prevent leaks
        }

        return done(null, user)
    }
))

module.exports = passport;