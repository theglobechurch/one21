import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icon';
import './style/CoreNav.css';

class CoreNav extends Component {

  render () {
    const { studies } = this.props;
    let studyLink = `/study/${studies[0].slug}`

    if (this.props.activeStudy) {
      studyLink = `/study/${ this.props.activeStudy.slug }`;
    }

    console.log(this.props);
    return (
      <nav className="coreNav">

        <Link
          to={{
            pathname: studyLink
          }}
          className="coreNav__item">
          <Icon icon="study" />
          Study
        </Link>

        <Link
          to={{
            pathname: '/calendar'
          }}
          className="coreNav__item">
            <Icon icon="calendar" />
            Calendar
        </Link>

      </nav>
    );
  }
}

export default CoreNav;
