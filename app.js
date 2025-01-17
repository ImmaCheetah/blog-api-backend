require("dotenv").config();

const express = require("express");
const path = require("node:path");
const cors = require("cors");

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Path to public folder
const assetsPath = path.join(__dirname, "/public");

// Routers
const indexRouter = require("./routes/indexRouter");
const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRouter");

// app.set("views", path.join(__dirname, "views/pages"));
// app.set("view engine", "ejs");

// CONFIGURE ACCESS AFTER DEPLOYING APP
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(assetsPath));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/posts", blogRouter);

app.use((err, req, res, next) => {
  console.error("APP ERROR", err);

  res.status(err.statusCode || 500).json({
    name: err.name,
    errorMsg: err.message,
    status: err.statusCode,
  });
});

app.listen(process.env.PORT, () => console.log("App running on port", PORT));
