require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https");
const alert = require('alert');


app.use(express.urlencoded());

app.get("/", function(req, res) {
 res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  apiKey = process.env.APIKEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=" + apiKey + "#";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {

      if (response.statusCode === 200) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
        res.write("<div><h1>Temperature in "+ query +" is " + temp + " degree celcius.</h1> <p>The Weather is Currently " + weatherDescription + "</p> <img src=" + icon + "></div>");
        res.send();
      } else {
        res.redirect("/");
        alert("Invalid City Name")
      }
    })
  })
})







app.listen(3000, function() {
  console.log("Server has started on Port 3000!");
})
