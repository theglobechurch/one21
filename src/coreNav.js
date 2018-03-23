import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icon';
import './style/CoreNav.css';

export default class CoreNav extends Component {

  render () {

    return (
      <nav className="coreNav">

        <Link
          to={{
            pathname: '/'
          }}
          className={"coreNav__item " + (this.props.view === 'landing' ? 'coreNav__item--active' : '')}>
          <Icon icon="home" />
          Home
        </Link>

        <Link
          to={{
            pathname: '/calendar'
          }}
          className={"coreNav__item " + (this.props.view === 'guides' ? 'coreNav__item--active' : '')}>
            <Icon icon="study" />
            Guides
        </Link>

        <Link
          to={{
            pathname: '/profile'
          }}
          className={"coreNav__item " + (this.props.view === 'profile' ? 'coreNav__item--active' : '')}>
            <Icon icon="person" />
            Me
        </Link>

      </nav>
    );
  }
}
