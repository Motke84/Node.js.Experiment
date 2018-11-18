require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const weatherApi = require('./weatherApi/weatherApi');
const flowApi = require('./flowApi/flowApi');
const requestIp = require('request-ip');
const { WeatherReport } = require('./models/weatherReport.js');
const cors = require('cors');
const bodyParser = require('body-parser');

var { mongoose } = require('../db/mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.use(cors({ origin: '*' }));

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

app.get('/reports', (req, res) => {
    WeatherReport.find().then((reports) => {
        res.send({ reports });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/saveFlow', (req, res) => {
    var flowItems = req.body.params;
   
    console.log(flowItems);
    flowApi.saveFlow(flowItems).then(doc => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/getFlow', (req, res) => {
    flowApi.getFlow().then(doc => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/getWeather', (req, res) => {
    getWeather(req, res, sendWeatherData, createWeatherResponse);
});


app.get('/getWeatherWidget', (req, res) => {
    getWeather(req, res, renderWeatherData, createWeatherResponse);
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Weather API',
        currentYear: new Date().getFullYear()
    });
});

app.get('/PageNotFound', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
    });
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});



const getWeather = (req, res, callback, display) => {
    const ip = req.userIp;
    const address = req.query.address;
    address ?
        weatherApi.getWeather(address).payload
            .then(data => {
                data.save().
                    then(doc =>
                        callback(doc, res, display)).
                    catch(e => {
                        console.log(e);
                    })
            }).
            catch(e => {
                res.send({
                    result: {
                        error: e.message
                    }
                })
            }) :
        weatherApi.getWethersByIp(ip).payload
            .then(data => {
                data.save().
                    then(doc =>
                        callback(doc, res, display)).
                    catch((e) => {
                        console.log(e);
                    })
            }).
            catch(e => {
                res.send({
                    result: {
                        error: e.message
                    }
                })
            });
};



const sendWeatherData = (data, res, display) => {
    // console.log("weather result: ", data);
    res.send({
        result: display(data)
    });
};

const renderWeatherData = (data, res, display) => {
    const response = display(data);
    res.render('weather.hbs', {
        pageTitle: 'Weather API',
        Address: response.address,
        Forecast: response.weather
    });
};


const createWeatherResponse = (weatherReport) => {

    return {
        address: weatherReport.address,
        weather: `It's, currently ${weatherReport.temperature}°. It feels like ${weatherReport.feelsLike}°.`
    };
}

module.exports = {
    app
}

