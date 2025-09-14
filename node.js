const express = require("express");
const { env } = require("process");
const app = express();
const fileUpload = require("express-fileupload");
const port = env.PORT || 3000;
const cloudinary = require("cloudinary");
require("dotenv").config();

app.use(fileUpload({ useTempFiles: true }));
app.set("views", "./views");
app.set("view engine", "ejs");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", (req, res) => {
  cloudinary.v2.uploader
    .upload(req.files.image.tempFilePath, {
      use_filename: true,
    })
    .then((result) => console.log(result));
});
app.get("/", (req, res) => res.render("index", { title: "Hello World!" }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
