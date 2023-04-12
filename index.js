const connectToMongo=require('./db');
const express= require('express');
var cors = require('cors')

connectToMongo();

const app=express();
const port=2000;

// To send JSON data
app.use(cors())
app.use(express.json());

// Available Routes
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

app.listen(port,()=>{
    console.log(`iNotebook Listening at http://localhost:${port}`)
})
