require("dotenv").config();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const prisma = require("../db/prisma");
const LocalStrategy = require("passport-local").Strategy;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

const verifyCallback = async (username, password, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    console.log("PASSPORT VERIFY USER", user);
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log("CREDENTIALS MATCHED");
      return done(null, user);
    } else {
      console.log("CREDENTIALS NOT MATCHED");
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (error) {
    return done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log("JWT PAYLOAD", jwt_payload);
    const user = await prisma.user.findFirst({
      where: {
        id: jwt_payload.id,
      },
    });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }),
);
