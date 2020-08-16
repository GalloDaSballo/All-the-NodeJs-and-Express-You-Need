const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

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
        delete user.password //Avoid leaking hashed password
        done(null, user)
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
        if (!user) return done(null, false);

        //TODO: Verify Pass


        return done(null, user)
    }
))

module.exports = passport;