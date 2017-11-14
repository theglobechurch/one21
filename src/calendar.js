import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/SermonList.css';
import SermonListItem from './sermonListItem';

class Calendar extends Component {

  componentDidMount() {
    this.props.setTitle('Calendar');
  }

  render() {
    const { studies } = this.props;
    return (
      <section className="cal">
        { studies ? (
          studies.map(study => (
            
            <div className="sermonList" key={study.date}>
              <Link to={{
                  pathname: `/study/${study.slug}`
              }}>
                <SermonListItem
                  {...study}
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
