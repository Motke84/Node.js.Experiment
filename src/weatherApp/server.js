require('dotenv').config()
const express = require('express');
const hbs = require('hbs');
const weatherApi = require('./weatherApi/weatherApi');

const app = express();
const port = process.env. PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.get('/getWeather', (req, res) => {

    weatherApi.getWeather("Natan 12 Ramat-Gan").payload
        .then(data => {
            console.log("weather result: ", data);
            res.send({
                result: data
            });
        });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});



