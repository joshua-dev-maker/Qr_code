const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");

// using express as a middleware
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4567;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// baseurl
app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  qrcode.toDataURL(input_text, (err, src) => {
    if (err) res.send(error.message);
    res.render("scan", {
      qr_code: src,
    });
  });
});
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
