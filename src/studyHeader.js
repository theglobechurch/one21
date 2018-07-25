import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style/StudyHeader.css";

export default class StudyHeader extends Component {
  static defaultProps = {
    passageLinked: true
  };

  showPassage(ev) {
    ev.preventDefault();
  }

  render() {
    return (
      <div className="studyHeader">
        <div className="studyHeader__title">{this.props.name}</div>
        {this.props.passageLinked ? (
          <button
            className="studyHeader__passage"
            onClick={this.props.toggleBiblePopup}
          >
            {this.props.passage}
          </button>
        ) : (
          <span className="studyHeader__title">{this.props.passage}</span>
        )}
      </div>
    );
  }
}

StudyHeader.propTypes = {
  name: PropTypes.string.isRequired,
  passage: PropTypes.string,
  passageLinked: PropTypes.bool,
  toggleBiblePopup: PropTypes.func.isRequired
};
