const mongoose = require('mongoose');

const url = process.env.MONGODB_URL

mongoose.connect(url)
.then((res)=>{
    console.log("DB Connected...")
})
.catch((err)=>{
    console.log("Failed to connect to db: " + err)
});