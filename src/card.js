import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import './style/Card.css';

export default class Card extends Component {

  render() {
    return (
      <section className="card">
        {this.props.image && (
          <header>
            <img src={this.props.image} alt="" />
          </header>
        )}

        <div className="card__body">
          { this.props.description && (
            <p className="pre_title">{this.props.pretitle}</p>
          )}

          <h1 className="big_title">{this.props.title}</h1>

          { this.props.description && (
            <p>{this.props.description}</p>
          )}

          { this.props.link && this.props.cta && (
            <Link
              to={{
                pathname: this.props.link
              }}
              className="action_text"
            >
              {this.props.cta}
            </Link>
          )}
        </div>
      </section>
    )
  }

}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  pretitle: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  cta: PropTypes.string
};
