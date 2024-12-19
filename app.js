require("dotenv").config();

const db = require("./db/queries");

const express = require("express");
const passport = require("passport");
const path = require("node:path");
const cors = require('cors');

//jwt stuff
const jwt = require("jsonwebtoken");

//passport stuff
const jwtStrategy  = require("./config/passport")
passport.use(jwtStrategy);

// Prisma session store packages
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Path to public folder
const assetsPath = path.join(__dirname, "/public");

// Routers
const indexRouter = require("./routes/indexRouter");
const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRouter");


app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

// CONFIGURE ACCESS AFTER DEPLOYING APP
app.use(cors());

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

app.use("/", indexRouter); 
app.use("/user", userRouter);
app.use("/posts", blogRouter);

app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).send("YAY! this is a protected Route")
})

app.listen(process.env.PORT, () => console.log("App running on port", PORT));