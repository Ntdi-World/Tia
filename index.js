const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'pic');
const express = require('express')
const app = express()

let pic;
const url = "https://raw.githubusercontent.com/n-tdi/Tia/main/pic/";

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    pic = files;
});

// Create express route for root at /tia
app.get('/tia', (req, res) => {
    res.setHeader('Content-Type', 'application/json'); // Respond with json
    num = Math.floor(Math.random()*pic.length);
    geture = url + pic[num]; // get random tia pic out of folder
    res.end(JSON.stringify({ id: num, picture: geture }, null, 3)); // return json
})

app.listen(3000);
