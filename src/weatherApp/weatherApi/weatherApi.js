const axios = require('axios');



const getWeather = (address) => {

    const formatedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formatedAddress}&key=AIzaSyBj4wjXiR-ikJos173OXGnBQKzEsdzOxcU`;

    axios.get(url).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/297a4af865bdd23c2bdbf471252f9933/${lat},${lng}?units=si`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    }).catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }
    });
};

//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyBj4wjXiR-ikJos173OXGnBQKzEsdzOxcU


const getWethersByIp = () => {
    const ipUrl = `https://api.ipify.org/?format=json`

    axios.get(ipUrl).then((response) => {

        const url = `http://api.ipstack.com/${response.data.ip}?access_key=88cc025ba5619f3e06ff7b1bd5318222`;

        return axios.get(url).then((response) => {
            if (response.data.status === 'ZERO_RESULTS') {
                throw new Error('Unable to find that address.');
            }
            const lat = response.data.latitude;
            const lng = response.data.longitude;

            const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBj4wjXiR-ikJos173OXGnBQKzEsdzOxcU`
            return axios.get(googleUrl).then((response) => {
                const lat = response.data.results[0].geometry.location.lat;
                const lng = response.data.results[0].geometry.location.lng;

                const weatherUrl = `https://api.darksky.net/forecast/297a4af865bdd23c2bdbf471252f9933/${lat},${lng}?units=si`;
                console.log(response.data.results[0].formatted_address);
                return axios.get(weatherUrl);
            }).then((response) => {
                const temperature = response.data.currently.temperature;
                const apparentTemperature = response.data.currently.apparentTemperature;
                console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
            }).catch((e) => {
                if (e.code === 'ENOTFOUND') {
                    console.log('Unable to connect to API servers.');
                } else {
                    console.log(e.message);
                }
            });
        });
    });
}

module.exports = {
    getWeather,
    getWethersByIp
}