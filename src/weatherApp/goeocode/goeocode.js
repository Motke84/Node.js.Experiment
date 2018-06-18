const request = require('request');



const goeocodeAddress = (address, callback) => {

    const formatedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${formatedAddress}&key=AIzaSyBj4wjXiR-ikJos173OXGnBQKzEsdzOxcU`,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback("Unable to connect to Google-Services")
        }
        else {
            switch (body.status) {
                case 'ZERO_RESULTS':
                    callback("address not right: " + address);
                    break;
                case 'OK':
                    const first = body.results[0];
                    //  console.log(first.formatted_address);
                    const loc = first.geometry.location;
                    // console.log(loc.lat, loc.lng);
                    callback(undefined, results = {
                        address: first.formatted_address,
                        latitude: loc.lat,
                        longitude: loc.lng
                    })
                    break;
            }
        }
    });
}

module.exports = {
    goeocodeAddress
}