const request = require('postman-request');
const geocodingSecretKey = 'pk.eyJ1IjoidGliZXJpdTEzIiwiYSI6ImNrbmU2Mmc2YjB1dXoycG83MGk2eTYzZ20ifQ.aYTYGF3gfUFE0gRymMnCag';

const geocode = (address, callback) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geocodingSecretKey}`;
console.log(url);
    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find coordinates', undefined);
        } else {
            const [longitude, latitude] = body.features[0].center;
            
            callback(undefined, {
                longitude,
                latitude,
                location: body.features[0].place_name
            });
        }
    })
};

module.exports = geocode;