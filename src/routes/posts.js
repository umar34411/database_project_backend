
const mysql=require('mysql')
const express = require('express')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')



const db = require('../database/db');
const auth = require('../middleware/auth');
const { route } = require('./signup');



const router = express.Router();


router.get('/all',auth,(req,res)=>{

    db.connection.query('select * from posts ORDER BY id DESC',function(error,result){
        if(error)
       { console.log(error)}
        else{
        if(result.length>0)
        {
            res.send(result)
        }else{
            res.send("no psts yet")
        }

    }
    })
})

router.post('/',auth,(req,res)=>{
    let postData=req.body;
    
   const createTableQuery="create table if not exists posts (id int NOT NULL PRIMARY KEY AUTO_INCREMENT , ownerEmail varchar(255),ownerName varchar(255),ownerProfileLink text,title text,postImage text)";
   const insertTableQuery="insert into posts SET ?";
   

   

   db.connection.query(createTableQuery,function(error,result){
       if(error)
       {
           console.log(error)
       }
   })

   db.connection.query('select * from users where email =' +mysql.escape(postData.email) ,function(error,result){
    
    if(error)
    {
        console.log("error retrieving name :"+error)
    }else{
        postData.ownerName=result[0].name;
        postData.ownerProfileLink=result[0].profileImage;
        db.connection.query(insertTableQuery , postData ,function (error ,result){
            if(error){
                console.log(error)
                res.send("failed")
            }else{
                res.send("success")
            }
            
        })

    }

   })





    
})


module.exports=router;