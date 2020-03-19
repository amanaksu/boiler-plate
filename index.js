// Hello-World
// From : http://expressjs.com/en/starter/hello-world.html

// Set Default Env Using ExpressJS  
const express = require('express');
const app = express();
const port = 5000;

// Set MongoDB 
const password = "3584ksu";
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://Kei:${password}@boiler-plate-sdh1y.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("Connected MongoDB!")).catch(err => console.log(err));

// Front-End : App 
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));