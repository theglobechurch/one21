import React, { Component } from "react";
import PropTypes from 'prop-types';
import './style/StudyHeader.css';

export default class StudyHeader extends Component {

  showPassage(ev) {
    ev.preventDefault();
    console.log('working on it');
  }

  render() {
    return (
      <div className="studyHeader">
        <div className="studyHeader__title">{this.props.name}</div>
        <button
          className="studyHeader__passage"
          onClick={this.props.toggleBiblePopup}
        >
          {this.props.passage}
        </button>
      </div>
    )
  }
}

StudyHeader.propTypes = {
  name: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired,
  toggleBiblePopup: PropTypes.func.isRequired
}
