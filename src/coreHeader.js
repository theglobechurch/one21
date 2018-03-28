import React, { Component } from 'react';
import PropTypes from "prop-types";
import Icon from './icon';
import './style/CoreHeader.css';

export default class CoreHeader extends Component {
  render() {
    const { title } = this.props;

    if (!title) return null;

    return (
      <header className="coreHeader">
        <BackButton />
        { title }
      </header>
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
