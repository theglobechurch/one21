import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/CoreNav.css';

class CoreNav extends Component {

  render () {
    const { studies } = this.props;
    return (
      <nav className="coreNav">

        { this.props.activeStudy ? (
          <Link
            to={{
              pathname: `/study/${ this.props.activeStudy.slug }`
            }}
            className="coreNav__item">
            Study
          </Link>
        ) : (
          <Link
            to={{
              pathname: `/study/${studies[studies.length - 1].slug}`
            }}
            className="coreNav__item">
            Study
          </Link>
        )}

        <Link
          to={{
            pathname: '/calendar'
          }}
          className="coreNav__item">
            Calendar
        </Link>

      </nav>
    );
  }
}

export default CoreNav;
