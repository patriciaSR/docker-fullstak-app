const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const mongodb = require('mongodb');

const {ObjectId} = mongodb;
const DB = {
	config: 'mongodb://mongo:27017'
};
let dbo;

app.use(cors());
app.use(bodyParser.json());

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
	let data = dbo.collection("micoleccion").find({}).toArray((error, result) => {
		if (error) {
			res.sendStatus(400);
		} else {
			res.json(result);
		}
	});
});

app.post('/misdatos', function (req, res) {
	const task = req.body;
	console.log('body is:', task);
	let data = dbo.collection("micoleccion").insert(task, function(error, result) {
		if (error) {
			res.sendStatus(400);
		} else {
			res.json(result.ops[0]);
		}
	});
});

app.delete ('/misdatos', function (req, res) {
	const id = req.body._id;
	let data = dbo.collection("micoleccion").deleteOne({_id: ObjectId(id)}, function(error) {
		if (error) {
			res.sendStatus(400);
		} else {
			res.sendStatus(204);
		}
	});
});

app.patch ('/misdatos', function (req, res) {
	const id = req.body._id;
	const status = req.body.checked;
	console.log(id, status);
	let data = dbo.collection("micoleccion").updateOne({_id: ObjectId(id)}, {$set: {checked: status}}, {upsert:true}, function(error) {
		if (error) {
			res.sendStatus(400);
		} else {
			res.sendStatus(204);
		}
	});
});

app.listen(PORT, function () {
	console.log('Your node js server is running on PORT:', PORT);
});