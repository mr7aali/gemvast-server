const express = require('express');
const cors = require('cors');
const app = express();
const port= process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//async await


app.get('/',(req,res)=>{
    res.send("node server runing ");
})
app.listen(port,()=>{
    console.log(`Node server runnig port ${port}`);
})