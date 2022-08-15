const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRouter = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

db.execute("SELECT * FROM products")
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.log('error123', err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(shopRoutes);

app.use(errorController.getPageNotFound);

app.listen(3001);
