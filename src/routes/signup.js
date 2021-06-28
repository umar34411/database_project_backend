
const express = require('express')
const mysql=require('mysql')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')



const db = require('../database/db');
const keys = require('../config/keys');


const router = express.Router();
var resp=null;

const AddUser=(userData,res)=>{


    const salt = bcrypt.genSaltSync(10);

    let hashed = bcrypt.hashSync(userData.password, salt);
    userData.password = hashed;

   


    const createTableQuery = "create table if not exists users (id int NOT NULL PRIMARY KEY AUTO_INCREMENT , name varchar(255),email varchar(255),password varchar(255),address text,phone varchar(255),education varchar(255),skills text,profileImage text)"
    const insertQuery = 'INSERT INTO users SET ?'

    db.connection.query(createTableQuery, function (error, result) {
        if (error)
            console.log(error)
    });




    db.connection.query('SELECT * FROM users where email =  '+ mysql.escape(userData.email),function(error,result){
        if (error){
            console.log("error field")
        }
        else{
            
            if(result.length<=0){
                

                db.connection.query(insertQuery, userData, async function (error, result) {
                    if (error) {
                        //console.log(error)
            
                        res.send("failed")
                    } else {
                        
                        var token =await jwt.sign( userData.email , keys.secret);
                        res.send(token)
                        
                    }
            
            
                });



            }else{
                res.send("already");
                return
            }
        }
    })

   


}


router.post('/', async (req, res) => {
    // const {name,email,password,address,phone,education,skills,profileImage}=req.body;

    let userData = req.body;

    AddUser(userData ,res);
   
    
   


})


module.exports = router