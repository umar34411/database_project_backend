const express = require('express')
const db = require('../database/db');
const auth = require('../middleware/auth');
const mysql=require('mysql')

const router = express.Router();

router.post('/update', auth, (req, res) => {
    let userData = req.body;
    var param=[
        userData,
        userData.email
    ]

    db.connection.query('UPDATE users SET ? where email = ? ',param, function (error, result) {
        if (error) {
            console.log(error)
            res.send("Failed");
        }
        else {
            res.send("success");
        }
    })

})



router.get('/user',auth,(req,res)=>{
    
    db.connection.query('select * from users where email = ' + mysql.escape(req.body.email),function(error,result)
    {
        if(error)
        {
            console.log(error)
        }else{
        res.send(result);
        }
    })
})

router.get('/user/posts',auth,(req,res)=>{
    
    db.connection.query('select * from posts where email = ' + mysql.escape(req.body.email),
    function(error,result){
        if(error)
        {
            console.log(error)
        }else{
            res.send(result);
        }
    }
    )
})


module.exports = router;