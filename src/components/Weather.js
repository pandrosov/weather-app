import React from "react";
import PropTypes from "prop-types";

function Weather(props) {
  return (
    <div className="data-weather">
      {props.dataWeather.city ? (
        <div>
          <p>
            <span>Tempreture:</span> {props.dataWeather.temp}
          </p>
          <p>
            <span>Location(city):</span> {props.dataWeather.city}
          </p>
          <p>
            <span>Location(country):</span> {props.dataWeather.country}
          </p>
          <p>
            <span>Time of sunset:</span> {props.dataWeather.sunset}
          </p>
        </div>
      ) : (
        <p>{props.dataWeather.info}</p>
      )}
      {props.dataWeather.error && <p>{props.dataWeather.error}</p>}
    </div>
  );
}

Weather.propTypes = {
  props: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Weather;
