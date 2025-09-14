const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 3000;
const cloudinary = require("cloudinary");
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

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
app.listen(PORT, HOSTNAME, () =>
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`)
);
