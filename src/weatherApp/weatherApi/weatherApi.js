const axios = require('axios');
const net = require('net');
const { WeatherReport } = require('../models/weatherReport.js');

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
        return createWeatherResponse(response, addressFromGoogle, null);
    }).catch((e) => {

        if (e.code === 'ENOTFOUND') {
            throw new Error(error_messages.ENOTFOUND);
        } else {
            throw new Error(e);
        }
    });

    return {
        type: getWeather,
        payload: result
    };
};

const error_messages = {
    UNKNOWN: 'Unknown Error',
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
                throw new Error(error_messages.ENOTFOUND);
            } else {
                throw new Error(e);
            }
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
            return createWeatherResponse(response, addressFromGoogle, ipAddress);
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



const createWeatherResponse = (response, addressFromGoogle, ipAddress) => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;

    var weatherReport = new WeatherReport({
        address: addressFromGoogle,
        ip: ipAddress,
        feelsLike: apparentTemperature,
        date: new Date().getTime(),
        temperature
    });

    return weatherReport;
}

