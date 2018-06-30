const axios = require('axios');
var net = require('net');


const getWeather = (address) => {
    // const formatedAddress =address;
    const formatedAddress = encodeURIComponent(address);
    const googleapisKey = process.env.GOOGLEAPIS_KEY;
    let addressFromGoogle;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formatedAddress}&key=${googleapisKey}`;

    const result = axios.get(url).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }
        const darkskyKey = process.env.DARKSKY_KEY;

        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const weatherUrl = `https://api.darksky.net/forecast/${darkskyKey}/${lat},${lng}?units=si`;
        addressFromGoogle = response.data.results[0].formatted_address;
        // console.log(address);
        return axios.get(weatherUrl);
    }).then((response) => {
        const temperature = response.data.currently.temperature;
        const apparentTemperature = response.data.currently.apparentTemperature;
        // console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
        return {
            address: addressFromGoogle,
            weather: `It's,currently ${temperature}°. It feels like ${apparentTemperature}°.`
        };

    }).catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers.');
        } else {
            console.log(e.message);
        }

        return {
            error: e
        };
    });

    return {
        type: getWeather,
        payload: result
    };
};



const getWethersByIp = (ip) => {

    const ipUrl = `https://api.ipify.org/?format=json`;

    const result = net.isIPv4(ip) ?
        getWeatherByIpInner(ip) :
        axios.get(ipUrl).then((response) => {
            return getWeatherByIpInner(response.data.ip);

        }).catch((e) => {
            if (e.code === 'ENOTFOUND') {
                console.log('Unable to connect to API servers.');
            } else {
                console.log(e.message);
            }

            return {
                error: e
            };
        });

    return {
        type: getWethersByIp,
        payload: result
    };
}


const getWeatherByIpInner = (ipAddress) => {
    const ipstackKey = process.env.IPSTACK_KEY;

    let addressFromGoogle;
    const url = `http://api.ipstack.com/${ipAddress}?access_key=${ipstackKey}`;

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
            addressFromGoogle = response.data.results[0].formatted_address;
            //  console.log(address);
            return axios.get(weatherUrl);
        }).then((response) => {
            const temperature = response.data.currently.temperature;
            const apparentTemperature = response.data.currently.apparentTemperature;
            // console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);

            const res = {
                address: addressFromGoogle,
                weather: `It's,currently ${temperature}°. It feels like ${apparentTemperature}°.`
            };
            console.log(res);

            return res;
        });
    });
}


module.exports = {
    getWeather,
    getWethersByIp,
}