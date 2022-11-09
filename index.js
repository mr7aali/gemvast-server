const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port= process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
//pass GAvUcicPpNfcq8lQ
// user gemvast




const uri = "mongodb+srv://gemvast:GAvUcicPpNfcq8lQ@cluster0.lopokh6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const userCollection  = client.db("gemVast").collection('services');

        app.get('/',async(req,res)=>{
            const query ={};
            const cursor  = userCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);

        })

    }
    finally{

    }
}

run().catch(er=>console.log(er))
app.get('/',(req,res)=>{
    res.send("node server runing ");
})
app.listen(port,()=>{
    console.log(`Node server runnig port ${port}`);
})