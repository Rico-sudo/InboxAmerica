const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  user: "admin",
  host: "database-2.cvexlsbjwd6j.us-east-2.rds.amazonaws.com",
  password: "popcorn91",
  database: "ppl_system",
});

app.post("/create", (req , res) => {
    const name = req.body.name;
    const age = req.body.age;
    const position = req.body.position;

  db.query(
    "INSERT INTO ppl_table (name ,age, position) VALUES (?,?,?)",
    [name, age, position],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Done");
      }
    }
  );
});

app.get("/persons" , (req , res)=>{
    db.query("SELECT * FROM ppl_table " , (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.put("/update", (req, res) => {
    const id = req.body.id;
    const position = req.body.position;
    db.query(
      "UPDATE ppl_table SET position = ? WHERE CAST(id as char(255)) = ?",
      [position, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM ppl_table WHERE CAST(id as char(255)) = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  




app.listen(3001, () => {
  console.log("Server is running on 3001 :)");
});
