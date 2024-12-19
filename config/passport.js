require("dotenv").config();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const prisma = require('../db/prisma');
const jwt = require('jsonwebtoken');
const LocalStrategy = require("passport-local").Strategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

const verifyCallback = async (username, password, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });
  
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        console.log('CREDENTIALS MATCHED')
        jwt.sign({user}, process.env.SECRET, (err, token) => {
            console.log(token)
            res.json({
              token
            })
        });
        return done(null, user);
      } else {
        // passwords do not match!
        console.log('CREDENTIALS NOT MATCHED')
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findFirst({ where: { id } });

    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = new JwtStrategy(opts, async (jwt_payload, done) => {
    // const userId = jwt_payload.sub
    // const user = await prisma.user.findFirst({
    //     where: {
    //       jwt_payload,
    //     },
    //   });
  
    //   if (!user) {
    //     return done(null, false, { message: "Incorrect username" });
    //   }
  
    //   const match = await bcrypt.compare(password, user.password);
    //   if (match) {
    //     return done(null, user);
    //   } else {
    //     // passwords do not match!
    //     return done(null, false, { message: "Incorrect password" });
    //   }
    if (jwt_payload.email === "dave@email.com") {
        console.log(jwt_payload.email);
        return done(null, true)
    }
    return done(null, false)
}) 
