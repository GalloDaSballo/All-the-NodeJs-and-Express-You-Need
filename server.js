const express = require('express')
const app = express()
const port = 3001
const routes = require('./routes')
const passport = require('./auth')
const session = require('express-session')

app.set('view engine', 'ejs');

app.use(express.json()) //Parse JSON bodies

app.use(session({
    secret: 'THE SECRET',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}))
app.use(passport.initialize());
app.use(passport.session());

//Once you can parse bodies.

//You are ready for the FIRST - CRUD APP.

//Ephemeral Data Storage
app.get("/", (req, res) => {
    const {user} = req
    res.render('pages/index', {user})    
})


//But before we get there, a word on Route Management
app.use("/api", routes)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})