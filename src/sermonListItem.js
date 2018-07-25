import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class SermonListItem extends Component {
  render() {
    const { name, date, passage, base_url } = this.props;
    let { image } = this.props;
    const recording_date = moment(date);

    if (image && image.substring(0, 4) !== "http") {
      image = base_url + image;
    }

    return (
      <div className="sermonList__item">
        {this.props.displayImage &&
          this.props.displayImage === true && (
            <img className="sermonList__item__leadimage" alt="" src={image} />
          )}
        <div className="sermonList__item__body">
          <h1 className="sermonList__item__title">{name}</h1>
          {date && (
            <span className="sermonList__item__date">
              {recording_date.format("Do MMMM YYYY")}
            </span>
          )}

          {passage && (
            <span className="sermonList__item__passage">{passage}</span>
          )}
        </div>
      </div>
    );
  }
}

export default SermonListItem;

SermonListItem.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  passage: PropTypes.string,
  base_url: PropTypes.string,
  displayImage: PropTypes.bool
};
