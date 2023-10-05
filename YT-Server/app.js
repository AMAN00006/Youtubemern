const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const videoRouter = require('./routes/video');
const commentRouter = require('./routes/comments');
const authRouter = require('./routes/authentication');

const cors = require("cors")
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();



// Define CORS options
// const corsOptions = {
//     origin: 'https://youtbefrontend.vercel.app', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Enable cookies and authentication headers
// };

// // Enable CORS with the defined options
// app.use(cors(corsOptions));



// Define CORS options
// const allowedOrigins = ['https://youtbefrontend.vercel.app'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow cookies to be sent with the request
// };

// Enable CORS with the defined options
//app.use(cors(corsOptions));

// app.use(
//       cors({
//         optionsSuccessStatus: 200,
//         origin: JSON.parse('https://youtbefrontend.vercel.app'),
//         // credentials: true,
//       }),
//     );


app.options('*',cors({
        optionsSuccessStatus: 200,
        origin: JSON.parse('https://youtbefrontend.vercel.app'),
        // credentials: true,
      }))


// Define the MongoDB connection string
const mongoDb = process.env.MONGO;

// Connect to MongoDB using Mongoose
mongoose.connect(`mongodb+srv://aman:aman9616223392@cluster0.rr10twt.mongodb.net/Youtube?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB is connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});















/*

//without .env file connect /////////////////////////////////////////////////////////

// Create a URL for the MongoDB

//const mongoDb = 'mongodb://127.0.0.1:27017/Youtube';


//jb collection==table ho tabhi show hoga mongodb me

//scheem se hi coonect karte hai  collection dikhne ke liye




// Connect to MongoDB using a promise

mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB is connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });



*/



// const connect = () => {
//     mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(() => {
//             console.log("Connected to db");
//         })
//         .catch(err => {
//             console.error("Error connecting to MongoDB:", err);
//         });
// }

// app.listen(4004, () => {
//     connect(),
//         console.log("Connected at 4004 port")
// })




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use error all over in catch blocks
app.use((err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || "Something got wrong !";

    return res.status(status).json({
        success: false,
        // status: status,
        status,
        // message: message
        message
    })
})

app.use('/', indexRouter);
app.use('/api/auths', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/videos', videoRouter);
app.use('/api/comments', commentRouter);


module.exports = app;
