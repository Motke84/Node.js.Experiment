require('dotenv').config()
const express = require('express');
const hbs = require('hbs');
const weatherApi = require('./weatherApi/weatherApi');

const app = express();
const port = process.env.PORT || 3000;
app.set('views', __dirname+'/views');
 
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
  });
   
app.use(express.static(__dirname + '/public'));






app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});



app.get('/getWeather', (req, res) => {

    var address = req.query.address;
    //  var address = 'Natan 12 Ramat-Gan';
    console.log(address);

    weatherApi.getWeather(address).payload
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



