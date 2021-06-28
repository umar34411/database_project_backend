const mysql=require('mysql')



const connection=mysql.createConnection(
    {
        host:'localhost',
        user:"root",
        password:"",
        database:"devConnector"
    }
)


const dbConnection=()=>{
    connection.connect((error)=>{
        if(error){
            console.log(error)
        }else{
            console.log('connected')
        }
    })


    
}


module.exports ={
    connection,
    dbConnection,
}