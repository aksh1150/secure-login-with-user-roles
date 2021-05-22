import express from 'express';
import cors from 'cors';
import { readdirSync } from "fs";
import mongoose from 'mongoose';
import csrf from 'csurf';
const morgan = require('morgan')
require('dotenv').config();

const csrfProtection = csrf({cookie: true})


const app = express();


// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("DB connected!"))
.catch((err) => console.log("DB error => ", err))


// apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// route
// fs = file system in node => this way we don't need to import file from routes dir when we create new, it takes all files by running .map function
// '/api' is not mandatory here
// if you import fs from "fs" instead import { readdirSync } from "fs" on line 3 then below write as fs.readdirSync()
readdirSync("./routes").map((fileName) => 
    app.use('/api', require(`./routes/${fileName}`))
);


// csrf
app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
})


// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on ${port}`));