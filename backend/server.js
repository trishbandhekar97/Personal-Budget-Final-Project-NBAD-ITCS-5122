const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes  = require("./routes/routes");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));



app.use(
  cors({
    origin: ["https://steady-sunburst-6076b1.netlify.app", "localhost:4200"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use("/api", routes)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });


module.exports = app;