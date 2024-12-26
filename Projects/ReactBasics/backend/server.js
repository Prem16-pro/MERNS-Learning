const express = require('express')
const app = express()
const loginRoute = require('./routes/login')
const dbConnect = require('./database/db')
const cors = require('cors')
// app.get('/',(res,req)=>{
//     res.send("hello bitxhes");
// })

// app.post("/login",(req,res)=>{
//     const {email , password} = req.body;
//     console.log("Email Rec:",email);
//     console.log("Password Rec:",password);
// })

app.use(cors())
app.get('/', (req,res) => {
    res.send("HEllo")
});

app.use(express.json());
app.use('/',loginRoute)

app.listen('3000', ()=>{
    dbConnect();
    console.log("server started at : http://localhost:3000");
})