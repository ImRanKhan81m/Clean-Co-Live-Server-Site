const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// ! Warning: Do not use in production
app.use(cors({
    origin: "*"
}));
app.use(express.json());


// cleanCoLive
// PwnT5VdTDgI9vtNz



const uri = "mongodb+srv://cleanCoLive:PwnT5VdTDgI9vtNz@cluster0.hkjli.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("cleanCo").collection("service")

        // ==================================Read/Get==========================>>

        app.get('/service', async (req, res) => {
            const services = await serviceCollection.find({}).toArray();
            res.send(services)
        })

        // ==================================Create/Post==========================>>

        app.post('/add-service', async (req, res) => {

            const data = req.body;
            const result = await serviceCollection.insertOne(data);
            res.send(result)
        })

        // ==================================Update/put==========================>>

        app.put("/update-service/:id", async(req, res)=>{
            const {id} = req.params;
            const data = req.body;
            const filter = {_id: ObjectId(id)};
            const updateDoc ={
                $set: data
            }
            const option = {upsert: true};
            const result = await serviceCollection.updateOne(filter, updateDoc, option);
            res.send(result)
 
        })
        // ==================================Delete==========================>>

        app.delete("/update-service/:id", async(req, res)=>{
            const {id} = req.params;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result)
        })

    } finally {
    }
}
run().catch(console.dir);






// Body======>
app.get('/dummy-route/user2', async (req, res) => {
    const data = req.body;
    res.json(data);
})

// Query =======>>>>
app.get('/dummy-route/user', async (req, res) => {
    const data = req.query;
    res.json(data);
})

// params =======>>>>
app.get('/dummy-route/:id', async (req, res) => {
    const { id } = req.params;
    res.json(id);
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})