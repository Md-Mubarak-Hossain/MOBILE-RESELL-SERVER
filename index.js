const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
// const package = require('./package.json')
const port = process.env.PORT || 5000;
require('dotenv').config();


// middle ware
app.use(cors())
app.use(express.json())

// app.get('/package', (req, res) => {
//     res.send(package);
// })
app.get('/', (req, res) => {
    res.send('mobile re-seller server running');
})

app.listen(port, () => {
    console.log(`The server is mobile re-seller and the port : ${port}`);
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.t8gyfdm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri)
async function run() {
    try {
        const database = client.db("resellerDatabase");
        const mobileCollection = database.collection("mobile");
        const newCollection = database.collection("test");
        // Query for a movie that has the title 'The Room'

        app.get('/package', async (req, res) => {
            const query = {};
            const cursor = mobileCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/package/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await mobileCollection.findOne(query);
            res.send(result)
        })

        app.post('/package', async (req, res) => {
            const user = req.body;
            const result = await mobileCollection.insertOne(user);
            console.log(result);
            res.send(result);
        })

        app.put('/package/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const filter = {
                _id: ObjectId(id)
            };
            const package = req.body;
            console.log(package);
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: package.name,
                    version: package.version
                }
            }
            const result = await mobileCollection.updateOne(filter, updateDoc, options);
            res.send(result);
            console.log(result);
        })

        app.delete('/package/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await mobileCollection.deleteOne(query);
            res.send(result);
        })

        app.get('/addData', async (req, res) => {
            const query = {};
            const cursor = newCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })



    } finally {
        console.log('re-seller finally run');
    }
}
run().catch(err => console.error(err));