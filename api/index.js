const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const mongodb = require('mongodb');
const DB = {
	config: 'mongodb://mongo:27017'
};
let dbo;

app.use(cors());

app.get('/', function (req, res) {
	res.json({ "hello": "express with mongo" });
});

const client = mongodb.MongoClient;
client.connect(DB.config, function (err, db) {
	if (err) {
		console.log('database is not connected')
	}
	else {
		console.log('connected!!');
		dbo = db.db("midb");
	}
});
app.get('/misdatos', function (req, res) {
	let data = dbo.collection("micoleccion").find({}).toArray((err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.post('/misdatos', function (req, res) {
	let data = dbo.collection("micoleccion").insert({req}).toArray((err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.listen(PORT, function () {
	console.log('Your node js server is running on PORT:', PORT);
});