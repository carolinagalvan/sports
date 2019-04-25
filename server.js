const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const sportsRouter = require('./router');
const app = express();
mongoose.Promise = global.Promise; //like an ajax call

const {DATABASE_URL, PORT} = require('./config');

const jsonParser = bodyParser.json(); //middleware

app.use(express.static('public'));

//makes the connection to the file, it also tells that every endpoint 
//inside sportsRouter needs to use the url establish as the first parameter
app.use('/sports/api', jsonParser, sportsRouter); 

let server;

function runServer(port, databaseUrl){
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl,
                err => {
                    if (err){
                        return reject(err);
                    }
                    else{
                        server = app.listen(port, () => {
                            console.log("Your app is running in port ", port);
                            resolve();
                        })
                        .on('error', err => {
                            mongoose.disconnect(); //in order to have only one connection to the database
                            return reject(err);
                        });
                    }
                }
            )
    });
}

function closeServer(){
    return mongoose.disconnect()
        .then(() => {
            return new Promise((resolve, reject) => {
                console.log("Closing the server");
                server.close(err => {
                    if(err){
                        return reject(err);
                    }else{
                        resolve();
                    }
                });
            });
        });
}

runServer(PORT, DATABASE_URL )
    .catch(err => console.log(err));

module.exports = {app, runServer, closeServer}

// app.use(function(req, res, next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content");
//     res.header("Access-Control-Allow-Headers", "GET,POST");
//     if (req.method === "OPPTIONS"){
//         return res.send(204);    
//     }
//     next();
// });