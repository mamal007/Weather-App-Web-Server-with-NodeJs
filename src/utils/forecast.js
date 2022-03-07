const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e9364799702857aa610fdd511a9a1995&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, {body} = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find the location!", undefined);
    } else {
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const weatherDescription = body.current.weather_descriptions[0];

      callback(
        undefined,
        `${weatherDescription}! It's ${temperature} degrees out, but it feels like ${feelsLike} degrees out.`
      );
    }
  });
};

module.exports = forecast;