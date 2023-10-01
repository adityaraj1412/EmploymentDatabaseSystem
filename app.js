const express= require('express');
const app=express()
const path = require('path')
const dotenv=require('dotenv')
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const session=require('express-session')
const flash = require('connect-flash');
const methodOverride =require('method-override')
const employeeRoutes=require('./routes/employees')

dotenv.config({path : './config.env'})

// connecting to mongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DATABASE_LOCAL; // Replace with your MongoDB URI
const client = new MongoClient(uri);

mongoose.connect(process.env.DATABASE_LOCAL)

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static('public'));

app.use(session({
    secret:"nodejs",
    resave:true,
    saveUninitialized:true
}))

app.use(methodOverride('_method'))

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash(('success_msg'))
    res.locals.error_msg=req.flash(('error_msg'))
    next();
})

app.use(employeeRoutes);

const port=3000;
app.listen(port,()=>{
    console.log("server is started")
})