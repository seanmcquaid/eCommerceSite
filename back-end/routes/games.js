const express = require("express");
const router = express.Router();
const db = require("../database");


router.get("/getHome", (req,res,next)=>{
    const gameQuery = `SELECT * FROM games 
    WHERE screenshot_url IS NOT NULL
    ORDER BY popularity desc 
    limit 4 ;`;
    db.query(gameQuery).then((results)=>{
        res.json(results)
    }).catch((error)=>{
        if(error){throw error};
    })
})

router.get("/:gid", (req,res,next)=>{
    const gid = req.params.gid;
    const selectQuery = `SELECT * FROM games WHERE id = $1;`;
    db.query(selectQuery,[gid]).then((gameData)=>{
        res.json(gameData)
    }).catch((error)=>{
        if(error){throw error};
    })
})


// games is already implied, because this middleware is only applied at /games
// /games/getHome


module.exports = router;