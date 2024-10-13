import React from "react";
import PropTypes from "prop-types";
import "./StudyHeader.css";

const StudyHeader = ({
  name, passage,
}) => (
  <div className="studyHeader">
    <div className="studyHeader__title">
      {name}
    </div>
    <span className="studyHeader__title">
      {passage}
    </span>
  </div>
);

export default StudyHeader;

StudyHeader.propTypes = {
  name: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired,
};
