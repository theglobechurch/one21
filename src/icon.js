import React, { Component } from "react";

export default class Icon extends Component {
  render() {
    return (
      <svg className={this.props.classname}>
        <use
          xlinkHref={`/one21icons.svg#${this.props.icon}`}
        />
      </svg>
    );
  }
}
