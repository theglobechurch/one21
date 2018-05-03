import React, { Component } from 'react';
import PropTypes from "prop-types";
import Icon from './icon';
import { Link } from "react-router-dom";

import './style/CoreHeader.css';

export default class CoreHeader extends Component {

  backLink = () => {
    const currentPath = window.location.pathname;
    
    let backPath = currentPath.substring(
      0,
      currentPath.lastIndexOf("/") + 1
    );

    if (backPath === currentPath) {
      backPath = "/";
    }
    return backPath;
  }

  render() {
    const { title } = this.props;
    const backPath = this.backLink();
    

    if (!title) return null;

    return (
      <header className="coreHeader">
        { backPath && (
          <Link
            className="coreHeader__back"
            to={{
              pathname: backPath
            }}
          >
            <Icon icon="pointLeft" classname="coreHeader__back__icon" />
          </Link>
        )}
        { title }
      </header>
    );
  }
}

CoreHeader.propTypes = {
  title: PropTypes.string
};
