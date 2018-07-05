const axios = require('axios');
var net = require('net');


const getWeather = (address) => {
    // const formatedAddress =address;
    const url = geGoogleapisUrl(address);
    let addressFromGoogle;

    const result = axios.get(url).then((response) => {

        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error(error_messages.ZERO_RESULTS);
        }

        const weatherUrl = getDarkskyUrl(response);

        addressFromGoogle = response.data.results[0].formatted_address;

        return axios.get(weatherUrl);
    }).then((response) => {
        return createWeatherResponse(response, addressFromGoogle);
    }).catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log(error_messages.ENOTFOUND);
        } else {
            console.log(e.message);
        }
        const error = {
       //     error_code: e.code,
            error_message: e.message
        };

        return {
             error
        };
    });

    return {
        type: getWeather,
        payload: result
    };
};

const error_messages = {
    ENOTFOUND: 'Unable to connect to API servers.',
    ZERO_RESULTS: 'Unable to find that address.'
}

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

    let addressFromGoogle;

    const url = getIpstackUrl(ipAddress);

    return axios.get(url).then((response) => {

        const googleUrl = getGoogleapisUrlByCoordinates(response);

        return axios.get(googleUrl).then((response) => {
            const weatherUrl = getDarkskyUrl(response);
            addressFromGoogle = response.data.results[0].formatted_address;

            return axios.get(weatherUrl);
        }).then((response) => {
            return createWeatherResponse(response, addressFromGoogle);
            console.log(res);

            return res;
        });
    });
}


module.exports = {
    getWeather,
    getWethersByIp,
    error_messages
}

const getGoogleapisUrlByCoordinates = (response) => {
    const googleapisKey = process.env.GOOGLEAPIS_KEY;
    const lat = response.data.latitude;
    const lng = response.data.longitude;
    const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleapisKey}`;
    return googleUrl;
}

const getIpstackUrl = (ipAddress) => {
    const ipstackKey = process.env.IPSTACK_KEY;
    const url = `http://api.ipstack.com/${ipAddress}?access_key=${ipstackKey}`;
    return url;
}

const geGoogleapisUrl = (address) => {
    const formatedAddress = encodeURIComponent(address);
    const googleapisKey = process.env.GOOGLEAPIS_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formatedAddress}&key=${googleapisKey}`;
    return url;
}

const getDarkskyUrl = (response) => {



    const darkskyKey = process.env.DARKSKY_KEY;
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/${darkskyKey}/${lat},${lng}?units=si`;
    return weatherUrl;
}

const createWeatherResponse = (response, addressFromGoogle) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;

    return {
        address: addressFromGoogle,
        weather: `It's, currently ${temperature}°. It feels like ${apparentTemperature}°.`
    };
}

