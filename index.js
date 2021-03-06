'use strict';

let http = require('http');
let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let path = require('path');
let bcrypt = require('bcrypt');
let secret = require('./secret.js');
let jwt = require('jsonwebtoken');

let port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
let ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
let app = express();

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Custom-Auth-Step1, Custom-Auth-Step2, Custom-Auth-Step3, Custom-Auth-Step4');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {res.sendStatus(200); }
    else { next(); }
}

app.use(allowCrossDomain);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html')); 
});

app.post('/firststepsecurity', (req,res) => { 

    let firstPassword = req.get('custom-auth-step1');   
    let username = req.body.username;
    let memorableA = req.body.memorableA; 

    let user = secret.secretData.users.find( user => user.name === username );
        if (typeof user === 'undefined') {
            res.json({success: false, message:'Failure. Invalid credentials'}); 
        };
    if (memorableA === user.memorableA) {
        if (firstPassword === user.firstPassword) {
            let token = jwt.sign(secret.secretData.signInEntityCaptain, secret.secretData.tokenSignInSecretCaptain, {
                expiresIn: "2 days"
              });
              res.json({
                success: true,
                message: 'First JWT token created and signed by Captain America!',
                username:user.name,
                token: token,
                secondRoute: secret.secretData.secondRoute
              });
        }
        else res.json({success: false, message:'Failure. Invalid credentials'}); 
    }      
    else {
        res.json({success: false, message:'Failure. Invalid credentials'});
    }    
});

app.post('/tfrytiruytrrgr56767j98', (req,res) => {
    let secondPassword = req.get('custom-auth-step2');   
    let token1 = req.body.token1;
    let username = req.body.username;

    let user = secret.secretData.users.find( user => user.name === username );
        if (typeof user === 'undefined') {
            res.json({success: false, message:'Failure. Invalid credentials'}); 
        };

    if (secondPassword === user.secondPassword) {        
        if (token1) {
            // verifies secret and checks exp
            jwt.verify(token1, secret.secretData.tokenSignInSecretCaptain, (err, decoded) => {
                if (err) {
                return res.json({ success: false, message: 'Failure. Invalid credentials' });
                }                 
                let token2 = jwt.sign(secret.secretData.signInEntityGeneral, secret.secretData.tokenSignInSecretGeneral, {
                    expiresIn: "2 days"
                    });
                res.json({
                    success: true,
                    message: 'Second JWT token created and signed by General Shang!',
                    token: token2,
                    username: user.name,
                    thirdRoute: secret.secretData.thirdRoute
                });                
            });        
        }
    }
    else {
        res.json({success: false, message:'Failure. Invalid credentials'});
    }
});

app.post('/dhaetyhaetgdhbfgbn5674ser', (req,res) => {

    let thirdPassword = req.get('custom-auth-step3');   
    let token2 = req.body.token2;
    let username = req.body.username;

    let user = secret.secretData.users.find( user => user.name === username );
        if (typeof user === 'undefined') {
            res.json({success: false, message:'Failure. Invalid credentials'}); 
        };

    if (thirdPassword === user.thirdPassword) {        
        if (token2) {
            // verifies secret and checks exp
            jwt.verify(token2, secret.secretData.tokenSignInSecretGeneral, (err, decoded) => {
                if (err) {
                    return res.json({ success: false, message: 'Failure. Invalid credentials' });
                }                 
                let token3 = jwt.sign(secret.secretData.signInEntityCommander, secret.secretData.tokenSignInSecretCommander, {
                    expiresIn: "2 days"
                    });
                res.json({
                    success: true,
                    username: user.name,
                    message: 'Third JWT token created and signed by President Abraham Lincoln!',
                    token: token3,
                    fourthRoute: secret.secretData.fourthRoute
                });                
            });        
        }
    }
    else {
        res.json({success: false, message:'Failure. Invalid credentials'});
    } 
});

app.post('/sdjogfnwo0aq23aojfnapw', (req,res) => {
    let fourthPassword = req.get('custom-auth-step4');   
    let token3 = req.body.token3;
    let username = req.body.username;

    let user = secret.secretData.users.find( user => user.name === username );
        if (typeof user === 'undefined') {
            res.json({success: false, message:'Failure. Invalid credentials'}); 
        };

    if (fourthPassword === user.fourthPassword) {        
        if (token3) {
            // verifies secret and checks exp
            jwt.verify(token3, secret.secretData.tokenSignInSecretCommander, (err, decoded) => {
                if (err) {
                return res.json({ success: false, message: 'Failure. Invalid credentials' });
                }                                     
                res.json({
                    success: true,
                    message: 'Success! You have accessed the most secret data!',
                    superSecretData:'Five busy honey bees were resting in the sun. The first one said, "Let us have some fun." The second one said, "Where shall it be?" The third one said, "In the honey tree." The fourth one said, "Let us make some honey sweet." The fifth one said, "With pollen on our feet." The five little busy bees sang their buzzing tune, As they worked in the beehive all that afternoon. Bzzzzzz! Bzzzzzz! Bzzzzzz! Bzzzzzz! Bzzzzzz!'
                });                
            });        
        }
    }
    else {
        res.json({success: false, message:'Failure. Invalid credentials'});
    }
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port,"Process n." ,process.pid);




