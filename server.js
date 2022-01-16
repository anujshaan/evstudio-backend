const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database/connection');

dotenv.config();
const app = express();
const corsOption ={
    origin:"http://localhost:4200"
}

//used for parsing request of content-type : application/json
app.use(express.json());
//used for parsing request of content-type : application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))
//used to interact with frontend to exchange data
app.use(cors(corsOption));

//Routes
app.use('/api', require('./routes/authRoute'));
app.use('/api', require('./routes/userRoute'));


//connection checking
db.getConnection()
.then(result => console.log("database connected succesfully"))
.catch(err=> console.log(err));




const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})