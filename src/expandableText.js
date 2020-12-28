import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "./icon";
import "./style/ExpandableText.css";

export default class ExpandableText extends Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.state = {
      expanded: false,
    };
  }

  componentDidMount() {
    if (this.props.expanded) {
      this.container = document.querySelector(".expandableText__container");

      if (this.container) {
        this.container.classList.toggle("expandableText__container--contracted");
      }
    }
  }

  toggleView(ev) {
    if (ev) { ev.preventDefault(); }
    if (this.container) {
      this.container.classList.toggle("expandableText__container--contracted");
    }
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { text } = this.props;
    return (
      <div className="expandableText">
        <div className="expandableText__container">
          { text.map((p, i) => (
            <div
              className={`expandableText__container__block${this.props.scripture ? " expandableText__container__block--scripture" : ""}`}
              dangerouslySetInnerHTML={{ __html: p }}
              key={i}
            />
          ))}
        </div>

        { this.props.expanded && (
          <button
            className="expandableText__button"
            onClick={this.toggleView.bind(this)}
          >
            { this.state.expanded ? (
              <span>Show less</span>
            ) : (
              <span>Keep Reading</span>
            )}
            <Icon icon="arrowRight" />
          </button>
        )}
      </div>
    );
  }
}

ExpandableText.propTypes = {
  expanded: PropTypes.bool.isRequired,
  scripture: PropTypes.bool,
  text: PropTypes.array.isRequired,
};
