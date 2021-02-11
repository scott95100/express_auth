require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');



const app = express();
app.set('view engine', 'ejs');

//secret session here
const SECRET_SESSION = process.env.SECRET_SESSION;

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

//Session Middleware

// secret: What we actually will be giving the user on our site as a session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: If we have a new session, we save it, therefore making that true
const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionObject));
///PASSPORT///
app.use(passport.initialize());//initalize passport
app.use(passport.session());//add a session
///FLASH////
app.use(flash());
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerst = req.flash();
  res.locals.currentUser = req.user;
  next();
});


////CONTROLLERS////
app.use('/auth', require('./controllers/auth'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});




const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
