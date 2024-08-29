const express = require('express');
const bodyParser = require("body-parser");


const router = require('./routes/productRoute');
const connectToMongoDB = require("./connection")

const app = express();
const mongoAtlas = 'mongodb+srv://samyakjn2431:Smyk%40mongo%23try@mycluster0.usysktu.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster0';
const mongoURL = 'mongodb://127.0.0.1:27017/ecommerce-try'
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectToMongoDB(mongoAtlas).then(() => console.log("mongodb connected"));


app.use('/api/product/', router)

app.get("/", (req, res)=>{
  res.send("hi from starting")
})



app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
