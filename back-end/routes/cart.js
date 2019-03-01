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

router.post("/updateCart", (req,res,next)=>{
    // res.json("test");
    const token = req.body.token;
    const itemId = req.body.itemId
    console.log(token);
    const getUser = `SELECT id from users WHERE token = $1;`;
    db.query(getUser, [token]).then((results)=>{
        if(results.length === 0){
            res.json({
                msg : "badToken"
            })
        } else {
            const uid = results[0].id
            const addToCartQuery = `INSERT INTO cart (uid,gid,date)
            VALUES
            ($1,$2,NOW())`;
            db.query(addToCartQuery,[uid,itemId]).then(()=>{
                const getCartTotals = `SELECT * from cart where uid = $1;`;
                db.query(getCartTotals,[uid]).then((results)=>{
                    res.json(results);
                }).catch((error)=>{
                    if(error){throw error};
                })
            }).catch((error)=>{
                if(error){throw error}
            })
        }
    }).catch((error)=>{
        if(error){throw error};
    })
})

module.exports = router;