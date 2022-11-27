const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
// const mobile = require('./mobile.json')
const port = process.env.PORT || 5000;
require('dotenv').config();


// middle ware
app.use(cors())
app.use(express.json())

// app.get('/mobile', (req, res) => {
//     res.send(mobile);
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
        const blogCollection = database.collection("blog");
        const faqCollection = database.collection("faqAns");
        const adminCollection = database.collection("admin");
        const userCollection = database.collection("user");
        const sellerCollection = database.collection("seller");
        const wishCollection = database.collection("addWishList");
        // Query for a movie that has the title 'The Room'
        // admin email password
        app.get('/admin', async (req, res) => {
            const query = {};
            const cursor = adminCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // admin email password end

        // buyer product
        app.get('/wish', async (req, res) => {
            const query = {};
            const cursor = wishCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/wish/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await wishCollection.findOne(query);
            res.send(result)
        })
        app.post('/wish', async (req, res) => {
            const user = req.body;
            const result = await wishCollection.insertOne(user);
            console.log(result);
            res.send(result);
        })
        app.put('/wish/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const filter = {
                _id: ObjectId(id)
            };
            const wish = req.body;
            console.log(wish);
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: wish.name,
                    brand,
                    ram,
                    camera,
                    useTime,
                    resalePrice,
                    category,
                    battery,
                    price,
                    location,
                    picture,
                    seller,
                    paid: "paid"
                }
            }
            const result = await wishCollection.updateOne(filter, updateDoc, options);
            res.send(result);
            console.log(result);
        })
        app.delete('/wish/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await wishCollection.deleteOne(query);
            res.send(result);
        })

        // user email password 
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            console.log(result);
            res.send(result);
        })
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        // user email password end
        // seller email password 
        app.get('/seller', async (req, res) => {
            const query = {};
            const cursor = sellerCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/seller/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await sellerCollection.findOne(query);
            res.send(result)
        })
        app.post('/seller', async (req, res) => {
            const seller = req.body;
            const result = await sellerCollection.insertOne(seller);
            console.log(result);
            res.send(result);
        })
        app.delete('/seller/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await sellerCollection.deleteOne(query);
            res.send(result);
        })
        // seller email password end
        // blog data
        app.get('/blog', async (req, res) => {
            const query = {};
            const cursor = blogCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // end blog
        // faq data
        app.get('/faqAns', async (req, res) => {
            const query = {};
            const cursor = faqCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // faq end
        app.get('/mobile', async (req, res) => {
            const query = {};
            const cursor = mobileCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/mobile/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await mobileCollection.findOne(query);
            res.send(result)
        })

        app.post('/mobile', async (req, res) => {
            const user = req.body;
            const result = await mobileCollection.insertOne(user);
            console.log(result);
            res.send(result);
        })

        app.put('/mobile/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const filter = {
                _id: ObjectId(id)
            };
            const mobile = req.body;
            console.log(mobile);
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: mobile.name,
                    brand: mobile.brand,
                    ram: mobile.ram,
                    camera: mobile.camera,
                    useTime: mobile.useTime,
                    resalePrice: mobile.resalePrice,
                    category: mobile.category,
                    battery,
                    price,
                    location,
                    picture,
                    seller
                }
            }
            const result = await mobileCollection.updateOne(filter, updateDoc, options);
            res.send(result);
            console.log(result);
        })

        app.delete('/mobile/:id', async (req, res) => {
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