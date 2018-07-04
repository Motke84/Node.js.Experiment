require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const weatherApi = require('./weatherApi/weatherApi');
const requestIp = require('request-ip');
const app = express();
const port = process.env.PORT || 3000;
app.set('views', __dirname + '/views');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use(express.static(__dirname + '/public'));



app.use(requestIp.mw({ attributeName: 'userIp' }))

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Weather API',
        welcomeMessage: 'Welcome to weather API site',
        showWeatherLinks: true
    });
});



app.get('/getWeather', (req, res) => {
    getWeather(req, res, sendWeatherData);
});


app.get('/getWeatherWidget', (req, res) => {
    getWeather(req, res, renderWeatherData);
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Weather API',
        currentYear: new Date().getFullYear()
    });
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});



const getWeather = (req, res, callback) => {
    const ip = req.userIp;
    const address = req.query.address;
    address ?
        weatherApi.getWeather(address).payload
            .then(data => {
                callback(data, res);
            }) :
        weatherApi.getWethersByIp(ip).payload
            .then(data => {
                callback(data, res);
            });
};



const sendWeatherData = (data, res) => {
    console.log("weather result: ", data);
    res.send({
        result: data
    });
};

const renderWeatherData = (data, res) => {
    res.render('weather.hbs', {
        pageTitle: 'Weather API',
        Address: data.address,
        Forecast: data.weather
    });
};

