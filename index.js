const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const menuRouter = require("./routes/menu");
const cartRouter = require("./routes/cart");
const addressRouter = require("./routes/address")

//config

dotenv.config();


//mongodb connect
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("mongodb is connected"))
.catch((err) => console.log(err));

//end points
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cors());
app.use("/api", userRouter);
app.use("/api/admin/", adminRouter);
app.use("/api", menuRouter);
app.use("/api", cartRouter);
app.use("/api", addressRouter)



//port
const port = process.env.port || 1000;


app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`)
  })