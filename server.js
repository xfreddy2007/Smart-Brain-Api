const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') });

// Signin
app.post('/signin', signin.handleSignin(db, bcrypt));

//Register
app.post('/register', register.handleRegister(db, bcrypt));

//profile.userId
app.get('/profile/:id', profile.handleProfileGet(db));

//image
app.put('/image', (req, res) => { image.handleimage(req, res, db) });

//input
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(PORT || 3000, () => {console.log(`app is running on ${ PORT }`)});