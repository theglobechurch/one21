import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const SermonListItem = ({
  name, date, displayImage, passage, base_url, image,
}) => {
  const recordingDate = moment(date);
  let guideImage = image;
  if (image && image.substring(0, 4) !== "http") {
    guideImage = base_url + image;
  }

  return (
    <div className="sermonList__item">
      {displayImage
          && displayImage === true && (
            <img className="sermonList__item__leadimage" alt="" src={guideImage} />
      )}
      <div className="sermonList__item__body">
        <h1 className="sermonList__item__title">{name}</h1>
        {date && (
        <span className="sermonList__item__date">
          {recordingDate.format("Do MMMM YYYY")}
        </span>
        )}

        {passage && (
        <span className="sermonList__item__passage">{passage}</span>
        )}
      </div>
    </div>
  );
};

export default SermonListItem;

SermonListItem.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired,
  base_url: PropTypes.string.isRequired,
  displayImage: PropTypes.bool.isRequired,
};
