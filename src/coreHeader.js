import React, { Component } from 'react';
import Icon from './icon';
import PropTypes from "prop-types";
import './style/CoreHeader.css';

export default class CoreHeader extends Component {


  render() {
    const { title } = this.props;
    return (
      <div>
        { title && (
          <header className="coreHeader">
            <BackButton />
            one21
            <span>: { title }</span>
          </header>
        )}
      </div>
    );
  }
}

CoreHeader.propTypes = {
  title: PropTypes.string
};


class BackButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <button
        className="coreHeader__back"
        onClick={this.context.router.history.goBack}
      >
        <Icon icon="pointLeft" classname="coreHeader__back__icon" />
      </button>
    );
  }
}
