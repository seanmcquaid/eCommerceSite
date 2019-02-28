var express = require('express');
var router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt-nodejs");
const randToken = require("rand-token");
const db = require("../database");

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
          token,
          username : req.body.username
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

router.post("/login", (req,res,next)=>{
  const username = req.body.username;
  const password = req.body.password;
  // 1. get the row with this username from postgres
  const selectUserQuery = `SELECT * FROM users where username = $1;`;
  db.query(selectUserQuery,[username]).then((results)=>{
    if(results.length === 0){
      // these arent the droids were looking for. BYE
      res.json({
        msg : "badUser"
      })
    }else {
      // user exists
      // check password
      const checkHash = bcrypt.compareSync(password, results[0].password);
      // checkHash is a boolean
      if(checkHash == true){
        // match! create a new token
        const token = randToken.uid(50);
        // update the DB with the new token
        const updateTokenQuery = `UPDATE users SET token = $1 where username = $2;`;
        db.query(updateTokenQuery,[token,username]).catch(()=>{
          if(error){throw error};
        });
        res.json({
          msg : "loginSuccess",
          token,
          username
        })
      }else{
        // bogus password, goodbye
        // you dont want to sell me deathsticks
        // you want to go home and rethink your life
        res.json({
          msg : "badPassword"
        })
      }
    }
  }).catch((error)=>{
    if(error){throw error};
  })

})

module.exports = router;
