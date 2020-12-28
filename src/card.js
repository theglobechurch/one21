import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./style/Card.css";

export default class Card extends Component {
  limitText(text, charCount = 100) {
    if (text.length < (charCount + 20)) { return text; }
    text = text.substring(0, charCount);
    const lastSpace = text.lastIndexOf(" ");
    if (lastSpace > 0) { text = text.substring(0, lastSpace); }
    return `${text}…`;
  }

  render() {
    return (
      <section className={`card ${this.props.className ? this.props.className : ""}`}>
        {this.props.image && (
          <header>
            <img src={this.props.image} alt="" />
          </header>
        )}

        <div className="card__body">
          { this.props.pretitle && (
            <p className="pre_title">{this.props.pretitle}</p>
          )}

          <h1 className="big_title">{this.props.title}</h1>

          { this.props.description && (
            <p>
              { this.props.description_limit === true ? (
                this.limitText(this.props.description)
              ) : (
                this.props.description
              )}
            </p>
          )}

          { this.props.link && this.props.cta && (
            <Link
              to={{
                pathname: this.props.link,
              }}
              className="action_text"
            >
              {this.props.cta}
            </Link>
          )}
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  pretitle: PropTypes.string,
  description: PropTypes.string,
  description_limit: PropTypes.bool,
  link: PropTypes.string,
  cta: PropTypes.string,
  className: PropTypes.string,
};
