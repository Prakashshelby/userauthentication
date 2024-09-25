const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
  };

app.use(cors()); 

connectDB();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
