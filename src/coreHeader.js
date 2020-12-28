import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "./icon";

import "./style/CoreHeader.css";

export default class CoreHeader extends Component {
  static backLink() {
    const currentPath = window.location.pathname;

    let backPath = currentPath.substring(
      0,
      currentPath.lastIndexOf("/") + 1,
    );

    if (backPath === currentPath) {
      backPath = "/";
    }
    return backPath;
  }

  render() {
    const { title } = this.props;
    const backPath = CoreHeader.backLink();

    if (!title) return null;

    return (
      <header className="coreHeader">
        { backPath && (
          <Link
            className="coreHeader__back"
            to={{
              pathname: backPath,
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
  title: PropTypes.string.isRequired,
};
