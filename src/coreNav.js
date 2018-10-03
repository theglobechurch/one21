import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icon';
import './style/CoreNav.css';

export default class CoreNav extends Component {

  render () {

    const { view, guides } = this.props;

    return <nav className="coreNav">
        <Link to={{ pathname: "/" }} className={"coreNav__item " + (view === "/" ? "coreNav__item--active" : "")}>
          <Icon icon="home" />
          Home
        </Link>

        { guides && guides.length > 1 && (
        <Link to={{ pathname: "/guides" }} className={"coreNav__item " + (view && view.indexOf("/guides") !== -1 ? "coreNav__item--active" : "")}>
          <Icon icon="study" />
          Guides
        </Link>
        )}

        { guides && guides.length === 1 && (
        <Link to={{ pathname: `/guides/` + guides[0].slug }} className={"coreNav__item " + (view && view.indexOf("/guides") !== -1 ? "coreNav__item--active" : "")}>
          <Icon icon="study" />
          Guide
        </Link>
        )}

        <Link to={{ pathname: "/profile" }} className={"coreNav__item " + (view === "/profile" ? "coreNav__item--active" : "")}>
          <Icon icon="person" />
          Me
        </Link>
      </nav>;
  }
}
