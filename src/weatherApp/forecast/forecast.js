const request = require('request');



const forecastByCoordinates = (coordinates, callback) => {

    request({
        url: `https://api.darksky.net/forecast/297a4af865bdd23c2bdbf471252f9933/${coordinates.latitude},${coordinates.longitude}?units=si`,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback("Unable to connect to Forecast.io-Services")
        }
        else {
            switch (response.statusCode) {
                case 400:
                    callback(body.error);
                    break;
                case 200:
                    callback(undefined, results = {
                        address: coordinates.address,
                        temperature: body.currently.temperature
                    })
                    break;
            }
        }
    });
}

const forecastByCoordinatesAsync = (coordinates) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/297a4af865bdd23c2bdbf471252f9933/${coordinates.latitude},${coordinates.longitude}?units=si`,
            json: true
        }, (error, response, body) => {

            if (error) {
                reject("Unable to connect to Forecast.io-Services")
            }
            else {
                switch (response.statusCode) {
                    case 400:
                        reject(body.error);
                        break;
                    case 200:
                        resolve(results = {
                            address: coordinates.address,
                            temperature: body.currently.temperature
                        })
                        break;
                }
            }
        });
    });
}

module.exports = {
    forecastByCoordinates,
    forecastByCoordinatesAsync
}