import React, { Component } from "react";
import moment from "moment"

class SermonListItem extends Component {
  render() {
    const { name, date, passage } = this.props;
    const recording_date = moment(date);
    return (
      <div className="sermonList__item">
        <div className="sermonList__item__body">
          <h1 className="sermonList__item__title">{ name }</h1>
          <span className="sermonList__item__date">{ recording_date.format('Do MMMM YYYY') }</span>
          <span className="sermonList__item__passage">{ passage }</span>
        </div>
        <div className="sermonList__item__star">
          *
        </div>
      </div>
    )
  }
}

export default SermonListItem;
