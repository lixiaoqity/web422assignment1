/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students. *
* Name: __Xiaoqi Li__ Student ID: __154921183_ Date: ___May 24,2020____
* Heroku Link: _https://web422-leon.herokuapp.com/___________
* ********************************************************************************/
//const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");
require('dotenv').config({path:"./config/keys.env"});

const myData = dataService(process.env.MONGODB_CONNECTING_ASSIGNMENT1);

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body)
app.post("/api/sales",(req,res)=>{
    myData.addNewSale(req.body).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message:`an adding sale error occurred: ${err}`})
    });
});


// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )
app.get("/api/sales/",(req,res)=>{
    myData.getAllSales(req.query.page,req.query.perPage).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message:`an finding sales error occurred: ${err}`})
    });
});


// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.get("/api/sales/:id",(req,res)=>{
    myData.getSaleById(req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message:`an finding sale error occurred: ${err}`})
    });
});

// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)
app.put("/api/sales/:id",(req,res)=>{
    myData.updateSaleById(req.body,req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message:`an updating error occurred: ${err}`})
    });
});

// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.delete("/api/sales/:id",(req,res)=>{
    myData.deleteSaleById(req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message:`an deleting error occurred: ${err}`});
    });
});

// ************* Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

