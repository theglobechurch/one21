import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style/Loader.css";

export default class Loader extends Component {
  render() {
    return (
      <div className="loader" style={{ minHeight: this.props.minHeight }}>
        <div className="loader__icon">
          <svg viewBox="22 22 44 44" className="loader__svg">
            <circle
              className="loader__svg__circle"
              cx="44"
              cy="44"
              r="20.2"
              fill="none"
              strokeWidth="3.6"
            />
          </svg>
        </div>

        <h1 className="loader__text">{this.props.message}</h1>
      </div>
    );
  }
}

Loader.defaultProps = {
  message: "Loading…",
  minHeight: "150px",
};

Loader.propTypes = {
  message: PropTypes.string,
  minHeight: PropTypes.string,
};
