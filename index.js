const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware  
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.olinusx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.olinusx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server    (optional starting in v4.7)
        // await client.connect();
        const packageCollection = client.db('GloriousSPA').collection('packages');

        const bookCollection = client.db('GloriousSPA').collection('books');
        const homepageCollection = client.db('GloriousSPA').collection('homepageContent');
        const photoGalleryCollection = client.db('GloriousSPA').collection('photoGallery');


        // package related api 

        app.post('/package', async (req, res) => {
            const data = req.body;
            const result = await packageCollection.insertOne(data);
            res.send(result);
        })

        app.get('/package', async (req, res) => {
            const result = await packageCollection.find().toArray();

            res.send(result);
        })

        app.get('/package/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await packageCollection.findOne(query);
            res.send(result);
        })

        app.put('/package/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }

            const result = await packageCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        })

        app.delete('/package/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await packageCollection.deleteOne(query);
            res.send(result);
        })



        // booking related api 
        app.post('/booking', async (req, res) => {
            const data = req.body;
            const result = await bookCollection.insertOne(data);
            res.send(result);
        })

        app.get('/booking', async (req, res) => {
            const result = await bookCollection.find().toArray();
            res.send(result);
        })

        app.get('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bookCollection.findOne(query);
            res.send(result);
        })

        app.put('/booking/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }

            const result = await bookCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        })

        app.delete('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bookCollection.deleteOne(query);
            res.send(result);
        })

        app.patch('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    status: 'paid'
                }
            }

            const result = await bookCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })



        // homepage api

        app.post('/homepageContent/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            if (id === 'notAvailable') {
                const result = await homepageCollection.insertOne(data);
                res.send(result);
            } else {
                const query = { _id: new ObjectId(id) };
                const options = { upsert: true };
                const updatedInfo = {
                    $set: {
                        ...data
                    }
                }

                const result = await homepageCollection.updateOne(query, updatedInfo, options);
                res.send(result);
            }

        })

        app.get('/homepageContent', async (req, res) => {
            const result = await homepageCollection.find().toArray();
            res.send(result);
        })

        // photo gallery api

        app.post('/photoGallery', async (req, res) => {
            const data = req.body;
            const result = await photoGalleryCollection.insertOne(data);
            res.send(result);
        })

        app.get('/photoGallery', async (req, res) => {
            const result = await photoGalleryCollection.find().toArray();
            res.send(result);
        })

        app.get('/photoGallery/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await photoGalleryCollection.findOne(query);
            res.send(result);
        })

        app.put('/photoGallery/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }

            const result = await photoGalleryCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        })

        app.delete('/photoGallery/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await photoGalleryCollection.deleteOne(query);
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is ok');
});

app.listen(port, () => {
    console.log(`SPA Server is running on port ${port}`);
});