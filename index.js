const express = require('express');

const db = require('./data/db.js');
//step 1
const router = require('./data/router.js');

const server = express();

server.use(express.json());


server.get('/', (req,res) => {
   res.send(`<h1>A Blog API</h1>`); 
});




server.use('/api/posts', router);

const port = process.env.PORT

server.listen(port, () => {
    console.log(`server is running on localhost:8000`);
});
