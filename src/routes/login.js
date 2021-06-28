
const mysql=require('mysql')
const express = require('express')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')



const db = require('../database/db');
const keys = require('../config/keys');


const router = express.Router();


const loginUser=(userData,res)=>{

 db.connection.query('select * from users where email =' +mysql.escape(userData.email),function(error,result){
     if(error)
     {
         console.log(error)
     }else{
         if(result.length<=0)
         {
            res.send("failed")
            return
         }else if(result.length>0)
         {
             let valid=bcrypt.compareSync(userData.password , result[0].password);
             
             if(valid)
           {
               let token=jwt.sign(userData.email,keys.secret);
               res.send(token);
           }

             else
             res.send("failed")
             return
         }
     }
 })


}


router.post('/', async (req, res) => {
   let userData=req.body;

   loginUser(userData,res);
})


module.exports = router