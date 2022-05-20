const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path')
const app = express();
const router = require('./Routes/routes')
require('./config/dbConnect')
require('./config/socket')

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname , '/public')));
app.use(cookieParser())
app.use(router);

// EJS 
app.set('view engine', 'ejs');


const port = process.env.port || 3000
app.listen(port,()=>{
    console.log("Server running at 3000...")
})