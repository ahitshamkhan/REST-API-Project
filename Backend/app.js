const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const ErrorController = require("./controllers/error");

const MONGO_URI = "mongodb://localhost:27017/airbab";
const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.userType = req.session.userType || null;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// Route handlers (to be implemented)
// app.use(userrouter);
// app.use(authrouter);
// app.use("/host", hostrouter);

app.use(ErrorController.pageNotFound);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });
