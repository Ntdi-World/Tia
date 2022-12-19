const path = require('path');
const fs = require('fs');
// Joining path of directory 
const directoryPath = path.join(__dirname, 'pic');
const express = require('express')
const app = express();

let pic;
const url = "https://raw.githubusercontent.com/n-tdi/Tia/main/pic/";

// Passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    // Handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    pic = files;
});

// Proudly stolen from https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

// Create express route at /tia
app.get('/tia', (req, res) => {
    res.setHeader('Content-Type', 'application/json'); // Respond with json
    num = Math.floor(Math.random()*pic.length);
    geture = url + pic[num]; // Get random tia pic out of folder
    res.end(JSON.stringify({ id: num, picture: geture }, null, 3)); // Return json
})

// Create express route at /tia/:id to get sdpecific tia pic
app.get('/tia/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json'); // Respond with json
    
    if (!isNumeric(req.params.id)) { // Check if the suppyled id is a numeric value
        res.sendStatus(400); // Send a bad request error code
        return; // Stop the request
    }

    num = parseInt(req.params.id); // Parse the reqest as an int. Probably will cause issues with strings :)
    
    if (num > pic.length - 1) { // If the supplyed int is not a valid tia pic, return 404
        res.sendStatus(404); // Send a not found error code
        return; // Stop the request
    }

    geture = url + pic[num]; // Get random tia pic out of folder
    res.end(JSON.stringify({ id: num, picture: geture }, null, 3)); // Return json
})



app.listen(4000);
console.log("Listening on port 4000")