import React, { Component } from "react";
import PropTypes, { string } from "prop-types";
import { v4 as uuidv4 } from "uuid";
import parse from "react-html-parser";
import Icon from "../Icon/Icon";
import "./ExpandableText.css";

export default class ExpandableText extends Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.state = {
      expandedState: false,
    };
  }

  componentDidMount() {
    const { expanded } = this.props;
    if (expanded) {
      this.container = document.querySelector(".expandableText__container");

      if (this.container) {
        this.container.classList.toggle("expandableText__container--contracted");
      }
    }
  }

  toggleView(ev) {
    const { expandedState } = this.state;
    if (ev) { ev.preventDefault(); }
    if (this.container) {
      this.container.classList.toggle("expandableText__container--contracted");
    }
    this.setState({ expandedState: !expandedState });
  }

  render() {
    const { expanded, scripture, text } = this.props;
    const { expandedState } = this.state;

    return (
      <div className="expandableText">
        <div className="expandableText__container">
          { text.map((p) => (
            <div
              className={`expandableText__container__block${scripture ? " expandableText__container__block--scripture" : ""}`}
              key={uuidv4()}
            >
              { parse(p) }
            </div>
          ))}
        </div>

        { expanded && (
          <button
            type="button"
            className="expandableText__button"
            onClick={this.toggleView.bind(this)}
          >
            { expandedState ? (
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
  text: PropTypes.arrayOf(string).isRequired,
};

ExpandableText.defaultProps = {
  scripture: null,
};
