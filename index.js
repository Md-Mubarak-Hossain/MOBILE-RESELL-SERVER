const express = require('express');
const cors = require('cors');
const app = express();
const package = require('./package.json')
const port = process.env.PORT || 5000;
require('dotenv').config();


app.get('/package', (req, res) => {
    res.send(package);
})
app.get('/', (req, res) => {
    res.send('mobile re-seller server running');
})

app.listen(port, () => {
    console.log(`The server is mobile re-seller and the port : ${port}`);
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.t8gyfdm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)
