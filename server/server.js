const express = require("express");
const app=express();
const mysql=require('mysql');


const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'projektilab1'
})




app.get("/", (req, res) => {
     
    const sqlInsert = "INSERT INTO userat (Name, Surname, `E-mail`, Password, Role) VALUES ('Mal', 'Mikullovci', 'alibungu@gmail.com', 'HamdiHamdi123', 1)";
    db.query(sqlInsert,(err,result)=>{
        if (err) {
            console.log(err); // log the error to the console
            res.send("Error occurred: " + err.message); // return an error message to the client
          } else {
            console.log(result); // log the result to the console
            res.send("Insert successful"); // return a success message to the client
            res.send("hello wor");
        }  
    });
    
});

app.listen(6001,()=>{
    console.log("running on port 6001")
});