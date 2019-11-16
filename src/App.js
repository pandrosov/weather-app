import React from "react";

import Info from "./components/Info";
import Weather from "./components/Weather";
import Form from "./components/Form";
import "./App.css";

const API_KEY = "a1b1279d1058bf886aa53556ec4a78a3";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunset: undefined,
    info: "Введите город",
    error: undefined
  };

  formatData = formatDate => {
    let date = new Date();
    date.setTime(formatDate);
    let sunset_date =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return sunset_date;
  };

  getCoords = input => {
    return input.split(";");
  };

  clearInput = e => {
    e.preventDefault();
    this.setState({
      temp: undefined,
      city: undefined,
      country: undefined,
      sunset: undefined,
      info: "Введите город",
      error: undefined
    });
    document.getElementById("input").value = "";
  };

  gettingWeather = async (isChecked, city) => {
    if (city) {
      let strRequest = "";
      if (isChecked) {
        strRequest = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
      } else {
        const coords = this.getCoords(city);
        strRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${
          coords[0]
        }&lon=${coords[1]}&APPID=${API_KEY}`;
      }
      const api_url = await fetch(strRequest);
      const data = await api_url.json();
      if (data.cod === "404" || data.cod === "400") {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          sunset: undefined,
          info: undefined,
          error: data.message
        });
      } else {
        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          sunset: this.formatData(data.sys.sunset),
          error: undefined,
          info: undefined
        });
      }
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunset: undefined,
        error: "Please, type city!"
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Info />
        <Form getWeather={this.gettingWeather} />
        <Weather dataWeather={this.state} />
      </div>
    );
  }
}

export default App;
