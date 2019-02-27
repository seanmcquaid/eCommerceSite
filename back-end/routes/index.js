var express = require('express');
var router = express.Router();
const passport = require("passport");
const pgp = require("pg-promise")();
const config = require("../config")
const connection = config.pg;
const db = pgp(connection);

router.get("/auth/github", passport.authenticate("github"));

router.get("/auth/github/callback", passport.authenticate("github"),(req,res,next)=>{
  const userName = req.user.username;
  const selectQuery = `SELECT * FROM users where userName = $1;`;
  const pgPromise = db.query(selectQuery,[userName]);
  pgPromise.then((data)=>{
    // console.log(data);
    if(data.length === 0){
      const insertQuery = `INSERT INTO users (username)
      VALUES($1);`
      db.query(insertQuery, [userName]).then((data2)=>{
        // console.log(data2)
      })
    }
  }).catch((error)=>{
    res.json(error)
  })
})

router.post("/register", (req,res,next)=>{
  // Bcrypt that password
  // check if username exists
  // if not, insert - userName and hashed password
  // create a token
  // if so, let react know
  res.json(req.body)
})

module.exports = router;
