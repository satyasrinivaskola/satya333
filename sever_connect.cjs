
require("dotenv").config();

const express = require("express");
const cors = require("cors");
//const multer = require("multer");
//const path = require("path");
//const fs = require("fs");

const pool = require("./pool");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/saress", async (req, res) => {

    const [rows] = await pool.execute(

        "SELECT * FROM images ORDER BY id DESC"

    );

    res.json(rows);

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server Running on ${PORT}`);

});