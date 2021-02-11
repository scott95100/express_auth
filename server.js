require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
//import passport config, come back later...
const flash = require('connect-flash');



const app = express();
app.set('view engine', 'ejs');

//secret session here
const SECRET_SESSION = process.env.SECRET_SESSION;

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

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
