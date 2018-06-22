const axios = require('axios');



const getWeather = (address) => {

    const formatedAddress = encodeURIComponent(address);
    const googleapisKey = process.env.GOOGLEAPIS_KEY;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formatedAddress}&key=${googleapisKey}`;

    axios.get(url).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }
        const darkskyKey = process.env.DARKSKY_KEY;

        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/${darkskyKey}/${lat},${lng}?units=si`;
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


const getWethersByIp = () => {
    const ipUrl = `https://api.ipify.org/?format=json`

    axios.get(ipUrl).then((response) => {

        const ipstackKey = process.env.IPSTACK_KEY;

        const url = `http://api.ipstack.com/${response.data.ip}?access_key=${ipstackKey}`;

        return axios.get(url).then((response) => {
            if (response.data.status === 'ZERO_RESULTS') {
                throw new Error('Unable to find that address.');
            }
            const googleapisKey = process.env.GOOGLEAPIS_KEY;

            const lat = response.data.latitude;
            const lng = response.data.longitude;

            const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleapisKey}`
            return axios.get(googleUrl).then((response) => {
                const darkskyKey = process.env.DARKSKY_KEY;

                const lat = response.data.results[0].geometry.location.lat;
                const lng = response.data.results[0].geometry.location.lng;

                const weatherUrl = `https://api.darksky.net/forecast/${darkskyKey}/${lat},${lng}?units=si`;
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