const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/getCart", (req,res,next)=>{
    // res.json("test");
    const token = req.body.token;
    const getUser = `SELECT id from users WHERE token = $1;`;
    db.query(getUser, [token]).then((results)=>{
        if(results.length === 0){
            res.json({
                msg : "badToken"
            })
        } else {
            const uid = results[0].id
            
        }
    }).catch((error)=>{
        if(error){throw error};
    })
})

module.exports = router;