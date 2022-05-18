// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3001;
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./db");
const db = new Pool(dbParams);
db.connect();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// Separated Routes for each Resource
const usersRoute = require("./routes/users");
const user_coinsRoute = require("./routes/user_coins");

// Mount all resource routes
app.use("/", usersRoute(db));
app.use("/", user_coinsRoute(db));

// Home page
app.get("/", (req, res) => {
  res.status(200).send("Test")
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});