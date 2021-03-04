import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style/StudyHeader.css";

export default class StudyHeader extends Component {
  showPassage = (ev) => {
    ev.preventDefault();
  }

  render() {
    const {
      name, passage, passageLinked, toggleBiblePopup,
    } = this.props;
    return (
      <div className="studyHeader">
        <div className="studyHeader__title">{name}</div>
        {passageLinked ? (
          <button
            type="button"
            className="studyHeader__passage"
            onClick={toggleBiblePopup}
          >
            {passage}
          </button>
        ) : (
          <span className="studyHeader__title">{passage}</span>
        )}
      </div>
    );
  }
}

StudyHeader.defaultProps = {
  passageLinked: true,

};

StudyHeader.propTypes = {
  name: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired,
  passageLinked: PropTypes.bool,
  toggleBiblePopup: PropTypes.func.isRequired,
};
