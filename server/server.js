require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const UserRouter = require('./routes/userRouter')
const errorHandler = require('./middleware/errorHandler')
const dbConnect = require('./config/dbConnection')
const validateUser = require('./middleware/validateToken')


app.use(cors());
dbConnect(); 
app.use(express.json()); 
app.use('/api/user', UserRouter);
app.use(errorHandler) ; 

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});