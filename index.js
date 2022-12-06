// import dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// initializing server app and port
const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());

// mongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.onfc57d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const database = client.db('revinnsProducts');
        const productCollection = database.collection('products');

        /*---- Products ----*/
        // Add new product
        app.post('/products', async (req, res) => {
            const product = req.body;

            const query = { porductId: product.porductId };
            const existingProduct = await productCollection.findOne(query);

            // If product doesn't exists in db then add product
            if (!product) {
                const result = await productCollection.insertOne(product);

                return res.send(result);
            }
            res.send({
                acknowledged: false,
            });
        });
    } finally {
    }
}

run().catch((error) => console.log(error));

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
