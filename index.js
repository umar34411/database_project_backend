const express= require('express')

const db=require('./src/database/db')

const app=express();

db.dbConnection();


app.use(express.json())



app.use('/signup',require('./src/routes/signup'))
app.use('/login',require('./src/routes/login'))
app.use('/posts',require('./src/routes/posts'))
app.use('/account',require('./src/routes/Account'))

app.listen(1337,()=>console.log("listening"))

