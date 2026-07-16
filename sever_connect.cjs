
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({

    destination:function(req,file,cb){

        cb(null,"uploads");

    },

    filename:function(req,file,cb){

        cb(null,file.originalname);

    }

});

const upload = multer({storage});
const pool = require("./pool");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/saress",upload.single("file"), async (req, res) => {

    const n="all is well"
    console.log(req.body)
    await pool.execute(
  "INSERT INTO images (title) VALUES (?)",
            [n]

    );

    res.json({row:"rows"});

});
app.get("/saress", async (req, res) => {

    const [rows] = await pool.execute(

        "SELECT * FROM images",
 

    );

    res.json(rows);

});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server Running  ${PORT}`);

});