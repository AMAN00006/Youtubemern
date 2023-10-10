const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// Define the MongoDB connection string
const mongoDb = process.env.MONGO;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// CORS Configuration
const corsOptions = {
    origin: 'https://youtbefrontend.vercel.app', // Update to the correct client URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and authentication headers
};

app.use(cors(corsOptions));

// Additional CORS headers (if needed)
// This block is not necessary if you are using the cors middleware above.
// Remove this block if it's causing conflicts.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://youtbefrontend.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

const port = process.env.PORT || 4004;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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






const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const videoRouter = require('./routes/video');
const commentRouter = require('./routes/comments');
const authRouter = require('./routes/authentication');

app.use('/', indexRouter);
app.use('/api/auths', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/videos', videoRouter);
app.use('/api/comments', commentRouter);

module.exports = app;
