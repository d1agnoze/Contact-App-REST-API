const express = require("express");
const errorHandler  = require("./middleware/errorHandler");
const connectDb = require("./config/DBconnection");
const env = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

connectDb()
app.listen(port);
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)
