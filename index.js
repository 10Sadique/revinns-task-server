// import dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// initializing server app and port
const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());

// initialize '/' route
app.get('/', (req, res) => {
    res.send({
        message: 'Server Running',
    });
});

// listenting to the port
app.listen(port, () => {
    console.log(`Server runnig at http://localhost:${port}`);
});
