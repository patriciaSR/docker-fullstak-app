const express = require('express');
const app = express();
const PORT = 3000;

const cors = require('cors');
const bodyParser = require('body-parser');


const mongodb = require('mongodb');
const DB = {
	config: 'mongodb://mongo:27017'
};
let dbo;

const { ObjectId } = mongodb;

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
	let data = dbo.collection("micoleccion").find({}).toArray((err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.post('/misdatos', function (req, res) {
	var task = req.body;
	console.log('body is:', task);
	let data = dbo.collection("micoleccion").insert(task, function (err, result) {
		if (err) {
			res.sendStatus(400)
		}else {
			res.json(result.ops[0]);
		}		
	});
});

app.delete('/misdatos', function (req, res) {
	var task = req.body;
	let data = dbo.collection("micoleccion").deleteOne(task).toArray((err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.patch('/misdatos', function (req, res) {
	const id = req.body._id;
	console.log(id);
	var status = req.body.checked;
	let data = dbo.collection("micoleccion").updateOne({ _id: ObjectId(id) }, { $set: { checked: status } }, { upsert: true }).toArray((err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

app.listen(PORT, function () {
	console.log('Your node js server is running on PORT:', PORT);
});