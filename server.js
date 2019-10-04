const express = require("express");
const cors = require("cors");
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Clarifai = require('clarifai');

const signIn = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const entries = require('./controllers/entries');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'killer',
		database: 'smartbrain'
	}
});

const clarifaiApp = new Clarifai.App({
	apiKey: '209cce519a634c60887b30fc24c0409d'
});

app.use(cors());

app.use(express.json());

app.post("/signin", signIn.handleSignin(bcrypt, db));

app.post("/register", register.handleRegister(bcrypt, db, saltRounds));

app.get("/profile/:id", profile.handleProfileGet(db));

app.post("/image", image.handleImage(clarifaiApp));

app.put("/entries", entries.handleEntries(db));

app.listen(3000, () => {
	console.log("App is running on port 3000");
});
