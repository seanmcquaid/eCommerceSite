var express = require('express');
var router = express.Router();
const passport = require("passport");
const pgp = require("pg-promise")();
const config = require("../config")
const connection = config.pg;
const db = pgp(connection);

const bcrypt = require("bcrypt-nodejs");
const randToken = require("rand-token");


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
  console.log(req.body.username)
  const checkUsernameQuery = `SELECT * FROM users WHERE username = $1;`;
  db.query(checkUsernameQuery,[req.body.username]).then((results)=>{
    console.log(results);
    if(results.length === 0){
      // if not, insert - userName and hashed password
      // user does not exist, lets add them
      const insertUserQuery = `INSERT INTO users (username,password,token)
      VALUES ($1,$2,$3);`;
      const token = randToken.uid(50);
        // use bcrypt.hashSync to make their password something EVIL
      const hash = bcrypt.hashSync(req.body.password);
      db.query(insertUserQuery,[req.body.username,hash,token]).then(()=>{
        res.json({
          msg : "userAdded",
          token
        })
      })
    }else {
      // user exists
      res.json({
        msg : "userExists"
      })
    }
  }).catch((error)=>{
    if(error){throw error};
  })
  // create a token
  // if so, let react know
  // res.json(req.body)
})

module.exports = router;
