import React, { Component } from "react";

class SermonListItem extends Component {
  render() {
    const { name, passage } = this.props;
    return (
      <div className="sermonList__item">
        <h1 className="sermonList__item__title">{ name }</h1>
        <span className="sermonList__item__passage">{ passage }</span>
      </div>
    )
  }
}

export default SermonListItem;
