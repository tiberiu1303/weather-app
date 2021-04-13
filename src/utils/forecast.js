const request = require('postman-request');
const apiSecretKey = '0482842f0fc8f17eb705d4e2afee9b10';

module.exports = forecast = (longitude, latitude, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=${apiSecretKey}&query=${latitude},${longitude}`;
    console.log(url);
    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.error) {
            callback('Unable to find coordinates', undefined);
        } else {
            const currentData = body.current;

            callback(undefined, `It is ${currentData.weather_descriptions[0]}, currently ${currentData.temperature} degrees out and it feels like ${currentData.feelslike} degrees out. The huminidy is ${currentData.humidity}%`);
        }
    })
};