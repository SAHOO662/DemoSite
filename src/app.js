var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors  = require("cors");

var constr = "mongodb://localhost:27017";
var app = express();

app.use(cors());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

app.get("/customers", (req, res)=> {
    mongoClient.connect(constr, (err, clientObject)=>{
        if(!err) {
            var database = clientObject.db("ourworkhub");
            database.collection("customer").find({}).toArray((err, documents)=>{
                if(!err){
                    res.send(documents);
                }
            })
        }
    })
});

app.post("/registercustomer", (req, res)=> {
    var customer = {
        // UserId: req.body.UserId,
        Name: req.body.Name,
        Email: req.body.Email,
        Mobile: req.body.Mobile,
        UserName: req.body.UserName,
        Password: req.body.Password
        // Age: parseInt(req.body.Age),
    }
    mongoClient.connect(constr,(err, clientObject)=>{
        if(!err) {
            var database = clientObject.db("ourworkhub");
            database.collection("customer").insertOne(customer, (err, result)=>{
                if(!err){
                    console.log("Record Inserted");
                    res.redirect("/customers");
                }
            })
        }
    })
});

app.listen(4400,()=>console.log(`Server Started : http://localhost:4400`));











// var express = require("express");
// var app = express();

// const port = process.env.PORT || 4400;



// app.get("/",(req, res)=>{
//     res.send(`<h2>Shopping Index</h2>
//     <p>Welcome to our website</p>`);
// });

// app.get("*", (req, res)=> {
//     res.send(`<h2>Page You Requested Not Found</h2>
//     <div>
//       API Provides only following:
//       <ol>
//        <li><a href="http://localhost:5500">Index</a></li>
//        <li><a href="http://localhost:5500/public/about.html">Products</a></li>
//       </ol>
//     </div>`
//     );
// });

// app.listen(port,()=>{
//     console.log(`Server is runing at the port no ${port}`);
// });



