const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
//config

dotenv.config();


//mongodb connect
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("mongodb is connected"))
.catch((err) => console.log(err));

//end points
app.use(express.json());
app.use(cors());
app.use("/api", userRouter)

//port
const port = process.env.port || 1000;

app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`)
  })