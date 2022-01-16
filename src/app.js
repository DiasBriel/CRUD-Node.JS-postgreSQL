const express = require("express");
const cors = require("cors");

const app = express();

const index = require("./routes/index");
const productRoute = require("./routes/product.routes");

app.use(express.urlencoded({ extended: true }));
/*
urlencoded is a middleware.
It parses incoming requests with
urlencoded payloads and is based on body-parser
*/

app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

app.use(index);
app.use("/api/", productRoute);

module.exports = app;
