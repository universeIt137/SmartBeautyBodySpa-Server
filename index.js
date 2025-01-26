const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware  
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { isLogin, isAdmin } = require('./middleware');
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
        const packageCollection = client.db('SmartSPA').collection('packages');

        const bookCollection = client.db('SmartSPA').collection('books');
        const homepageCollection = client.db('SmartSPA').collection('homepageContent');
        const photoGalleryCollection = client.db('SmartSPA').collection('photoGallery');
        const officeHourCollection = client.db('SmartSPA').collection('officeHour');
        const testimonialCollection = client.db('SmartSPA').collection('testimonial');


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

        // office hour api 
        app.post('/office-hour', async (req, res) => {
            const data = req.body;
            const result = await officeHourCollection.insertOne(data);
            res.send(result);
        })

        app.get('/office-hour', async (req, res) => {
            const result = await officeHourCollection.find().toArray();
            res.send(result);
        })

        app.get('/office-hour/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await officeHourCollection.findOne(query);
            res.send(result);
        })

        app.put('/office-hour/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }

            const result = await officeHourCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        })

        app.delete('/office-hour/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await officeHourCollection.deleteOne(query);
            res.send(result);
        })

        // testimonial related api 
        app.post('/testimonial', async (req, res) => {
            const data = req.body;
            const result = await testimonialCollection.insertOne(data);
            res.send(result);
        })

        app.get('/testimonial', async (req, res) => {
            const result = await testimonialCollection.find().toArray();
            res.send(result);
        })

        app.get('/testimonial/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await testimonialCollection.findOne(query);
            res.send(result);
        })

        app.put('/testimonial/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }

            const result = await testimonialCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        })

        app.delete('/testimonial/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await testimonialCollection.deleteOne(query);
            res.send(result);
        });




        // user related api



        app.post('/user', async (req, res) => {
            const data = req.body;
            const result = await userCollection.insertOne({ ...data, status: false, role: "user" });
            res.send(result);
        });



        app.post('/user-login', async (req, res) => {
            try {
                const { email, password } = req.body;

                // Validate input
                if (!email || !password) {
                    return res.status(400).json({ message: 'Email and password are required.' });
                }

                // Find the user with the given email and role as admin
                const user = await userCollection.findOne({ email, role: "admin" });

                if (!user) {
                    return res.status(401).json({ message: 'Invalid email or user does not have admin rights.' });
                }


                // Generate JWT token
                const token = jwt.sign(
                    { id: user._id, role: user.role },
                    "147854785", // Replace with a secure, environment-specific secret key
                    { expiresIn: '1h' } // Token validity for 1 hour
                );

                // Return success response with token
                res.status(200).json({
                    message: 'Login successful.',
                    token, // Send token to the client
                    user: user,
                    role: user.role
                });
            } catch (error) {
                console.error('Error during login:', error);
                res.status(500).json({ message: 'An error occurred. Please try again later.' });
            }
        });





        // all user

        app.get('/user', isLogin, isAdmin, async (req, res) => {
            const result = (await userCollection.find().toArray());
            res.send(result);
        });





        // user profile

        app.get('/single-user', isLogin, isAdmin, async (req, res) => {
            const id = req.headers.id;
            const query = { _id: new ObjectId(id) };
            const filter = {
                _id: query
            }
            const result = await userCollection.findOne(query);
            res.send(result);
        });


        const { ObjectId } = require("mongodb");

        app.put("/user/:id", isLogin, isAdmin, async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };

                // Find the current user data
                const existingUser = await userCollection.findOne(query);

                if (!existingUser) {
                    return res.status(404).json({ message: "User not found" });
                }

                // Toggle role between "admin" and "user"
                const currentRole = existingUser.role;
                const newRole = currentRole === "admin" ? "user" : "admin";

                // Update the user's role
                const updateResult = await userCollection.updateOne(
                    query,
                    { $set: { role: newRole } },
                    { upsert: true }
                );

                if (updateResult.modifiedCount === 0) {
                    return res.status(400).json({ message: "Role update failed" });
                }

                res.status(200).json({
                    message: "User role updated successfully",
                    updatedRole: newRole,
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
            }
        });

        // delete user
        app.delete("/user/:id", async (req, res) => {
            let id = req.params.id;
            const query = { _id: new ObjectId(id) };
            let data = await userCollection.deleteOne(query);
            res.send(data);
        });


        // package slider related api

        app.post('/package-slider', async (req, res) => {
            const data = req.body;
            const result = await packageSliderCollection.insertOne(data);
            res.send(result);
        })

        app.get('/package-slider', async (req, res) => {
            const result = await packageSliderCollection.find().toArray();
            res.send(result);
        })

        app.get('/package-slider/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await packageSliderCollection.findOne(query);
            res.send(result);
        })

        app.put('/package-slider/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }

            const result = await packageSliderCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        })

        app.delete('/package-slider/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await packageSliderCollection.deleteOne(query);
            res.send(result);
        });


        // banner related api

        app.post('/banner', async (req, res) => {
            const data = req.body;
            const result = await bannerCollection.insertOne(data);
            res.send(result);
        });

        app.get('/banner', async (req, res) => {
            const result = await bannerCollection.find().toArray();
            res.send(result);
        });

        app.get('/banner/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bannerCollection.findOne(query);
            res.send(result);
        });

        app.put('/banner/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }
            const result = await bannerCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        });

        app.delete('/banner/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bannerCollection.deleteOne(query);
            res.send(result);
        });


        // contact related api

        app.post('/contact', async (req, res) => {
            const { name, email, subject, message, phone } = req.body;
            const data = { name, email, subject, message, phone, status: false };
            const result = await contactCollection.insertOne(data);
            res.send(result);
        });

        app.get('/contact', async (req, res) => {
            const result = await contactCollection.find().toArray();
            res.send(result);
        });
        app.get('/contact/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contactCollection.findOne(query);
            res.send(result);
        });

        app.put('/contact/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }
            const result = await contactCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        });

        app.put('/contact-status/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    status: true
                }
            }
            const result = await contactCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        });

        app.delete('/contact/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contactCollection.deleteOne(query);
            res.send(result);
        });


        // contact related api

        app.post('/contact', async (req, res) => {
            const { name, email, subject, message, phone } = req.body;
            const data = { name, email, subject, message, phone, status: false };
            const result = await contactCollection.insertOne(data);
            res.send(result);
        });

        app.get('/contact', async (req, res) => {
            const result = await contactCollection.find().toArray();
            res.send(result);
        });
        app.get('/contact/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contactCollection.findOne(query);
            res.send(result);
        });

        app.put('/contact/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }
            const result = await contactCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        });

        app.put('/contact-status/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    status: true
                }
            }
            const result = await contactCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        });

        app.delete('/contact/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await contactCollection.deleteOne(query);
            res.send(result);
        });



        // why choose us related api


        app.post('/choose', async (req, res) => {
            const reqBody = req.body;
            const result = await whyChooseUsCollection.insertOne(reqBody);
            res.send(result);
        });

        app.get('/choose', async (req, res) => {
            const result = await whyChooseUsCollection.find().toArray();
            res.send(result);
        });
        app.get('/choose/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await whyChooseUsCollection.findOne(query);
            res.send(result);
        });

        app.put('/choose/:id', async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedInfo = {
                $set: {
                    ...data
                }
            }
            const result = await whyChooseUsCollection.updateOne(query, updatedInfo, options);
            res.send(result);
        });


        app.delete('/choose/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await whyChooseUsCollection.deleteOne(query);
            res.send(result);
        });













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