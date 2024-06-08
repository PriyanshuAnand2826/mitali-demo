require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000; 
const demo=require("./models/demo") 
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


//post api 
app.post('/add',(req,resp)=>{
    const {name,email}=req.body;
    const data = new demo({name,email})
    console.log(data)
    data.save()
    resp.json(data)
})

//get api
app.get('/get', async (req,resp)=>{ 
   const {email} = req.body
   const data = await demo.findOne({email})  
   console.log(data)
   resp.json(data)
})

//put api 
app.put('/update',async (req,resp)=>{
    const {email} =req.body
    const {age} =req.body
    const data = await demo.findOneAndUpdate({email:email},{$set:{age}})
    data.save()
    console.log(data)
})

//delete api  
app.delete('/delete',async (req,resp)=>{
    const userIdToDelete= '663a773506e1ced081723661'
    const data =await demo.deleteOne({ _id: userIdToDelete })
    console.log(data)
})






// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});