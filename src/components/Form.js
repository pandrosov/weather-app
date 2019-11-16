import React from "react";

import PropTypes from "prop-types";
import "./Form.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
      city: ""
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  checkboxChange = () => {
    this.setState(prevState => {
      return { isChecked: !prevState.isChecked };
    });
  };

  onHandleChange(e) {
    this.setState({
      city: e.target.value
    });
  }

  onHandleSubmit(e) {
    e.preventDefault();
    this.props.getWeather(this.state.isChecked, this.state.city);
    this.setState({
      city: ""
    });
  }

  render() {
    return (
      <div className="form">
        <form>
          <input
            onChange={this.onHandleChange}
            type="text"
            name="city"
            id="input"
            value={this.state.city}
            placeholder="city or coords(35;139) <--"
          />
          {this.state.isChecked ? (
            <label className="container">
              <input
                type="checkbox"
                name="isChecked"
                checked={this.state.isChecked}
                onChange={this.checkboxChange}
              />
              <span className="checkmark" />
              by city name mode
            </label>
          ) : (
            <label className="container">
              <input
                type="checkbox"
                name="isChecked"
                checked={this.state.isChecked}
                onChange={this.checkboxChange}
              />
              <span className="checkmark" />
              by coord mode
            </label>
          )}

          <button type="submit" onClick={this.onHandleSubmit}>
            Get weather
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  getWeather: PropTypes.func.isRequired
};

export default Form;
