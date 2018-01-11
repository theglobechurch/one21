import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/SermonList.css';
import './style/Calendar.css';
import SermonListItem from './sermonListItem';

class Calendar extends Component {

  componentDidMount() {
    this.props.setTitle('Calendar');
    this.props.setView('calendar');
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    const { studies } = this.props;
    return (
      <section className="calendar">
        <div className="tablecloth"></div>
        { studies ? (
          studies.map(study => (
            <div className="sermonList" key={study.date}>
              <Link to={{
                  pathname: `/study/${study.slug}`
              }}>
                <SermonListItem
                  {...study}
                  displayImage={false}
                  />
              </Link>
            </div>
          ))
        ) : (
          <div>Loading…</div>
        )}
      </section>
    )
  }

}

export default Calendar;
