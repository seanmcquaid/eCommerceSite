var express = require('express');
var router = express.Router();
const passport = require("passport");
const pgp = require("pg-promise")();
const config = require("../config")
const connection = config.pg;
const db = pgp(connection);

router.get("/auth/github", passport.authenticate("github"));

router.get("/auth/github/callback", passport.authenticate("github"),(req,res,next)=>{
  const userName = req.user._json.login;
  const selectQuery = `SELECT * FROM users where userName = ?;`;
  const pgPromise = db.query(selectQuery,[userName]);
  pgPromise.then((data)=>{
    // console.log(data);
    if(data.length === 0){
      const insertQuery = `INSERT INTO users (username)
      VALUES(?);`
      db.query(insertQuery, [userName]).then((data2)=>{
        // console.log(data2)
      })
    }
  })
})

module.exports = router;
