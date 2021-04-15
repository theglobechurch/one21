import React from "react";
import PropTypes from "prop-types";

const StudyLeadImage = (props) => {
  const { image } = props;
  return (
    <div
      className="study__introduction__image"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

StudyLeadImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default StudyLeadImage;
