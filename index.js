const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
//pass GAvUcicPpNfcq8lQ
// user gemvast

// process.env.DB_USER=gemvast
// process.env.DB_PASS=GAvUcicPpNfcq8lQ


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lopokh6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db("gemVast").collection('services');
        const reviewCollection = client.db("gemVast").collection('review');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);

        })
        app.get('/allservice', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        // services/
        app.get('/services/:id', async (req, res) => {

            const ID = req.params.id;
            const query = { _id: ObjectId(ID) }
            const service = await userCollection.findOne(query)
            res.send(service)
        })

        ///post
        app.post('/services', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result)
        }) 


        app.get('/myreviews/:email', async (req, res) => {
            const Email = req.params.email;
            const query = {email:Email};
            const cursor = await reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })
        app.delete('/myreviews/:id',async(req,res)=>{
            const Id =req.params.id;
            const query = {_id:ObjectId(Id)}
            const result = await reviewCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        })


    }
    finally {

    }
}

run().catch(er => console.log(er))
app.get('/', (req, res) => {
    res.send("node server runing ");
})
app.listen(port, () => {
    console.log(`Node server runnig port ${port}`);
})