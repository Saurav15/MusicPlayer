const express = require('express');
const route = express.Router();
const path = require('path');

// Controller
const  registration  = require('../controller/registration');
const login = require('../controller/login')
const addVideoTolist = require('../controller/addVideoToList');
const getNextVideoId = require('../controller/getNextVideoId');
const homePlayer = require('../controller/homePlayer');
const verifyMailToken = require('../controller/verifyMailToken')
const getAllQueuedSongs = require('../controller/getAllQueuedSong');
const getProfile = require('../controller/getProfile');
const downVote = require('../controller/downVote');

// Joi schema
const joiUserRegisterSchema = require('../joiSchema/joiUserRegisterSchema');
const joiUserLoginSchema = require('../joiSchema/joiLoginSchema');

// Middleware
const schemavalidation = require('../middleware/schemaValidate');
const verifyToken = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const updateLastSeen = require('../middleware/updateLastSeen');
const alreadyLoggedIn = require('../middleware/alreadyLoggedIn');


// Home page TV
route.get('/player',verifyToken,adminAuth,homePlayer);

// Get next song videoId
route.get('/getNextVideoId',verifyToken,adminAuth,getNextVideoId)


// Moblie user
route.get('/search',verifyToken,updateLastSeen,(req,res)=>{
    res.render('search');
});

route.get('/register',alreadyLoggedIn,(req,res)=>{
    res.render('register');
});

route.get('/login',alreadyLoggedIn,(req,res)=>{
    res.render('login');
});

// Post registration
route.post('/register',schemavalidation(joiUserRegisterSchema),registration)

// Verify user mail.
route.get('/verify/:id',verifyMailToken)

// @Post login route
route.post('/login',schemavalidation(joiUserLoginSchema),login);

// Get the song name from the user
route.post('/addVideoToList',verifyToken,updateLastSeen,addVideoTolist);



// Get all the songs that are in queue
route.get('/getAllQueuedSongs',verifyToken,updateLastSeen,getAllQueuedSongs);

// send queued song display file
route.get('/queue',verifyToken,updateLastSeen,(req,res)=>{
    res.render('queue')
});

// Send User Profile
route.get('/profile',verifyToken,updateLastSeen,getProfile);


// Voting 
route.post('/downVote',downVote);

module.exports = route;