const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mohammadreza Asgari",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mohammadreza Asgari",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Mohammadreza Asgari",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter address!",
    });
  }

  const address = req.query.address;
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send(error);
    }
    forecast(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send(error);
      }
      return res.send({ location, weatherData });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mohammadreza Asgari",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mohammadreza Asgari",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
