import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./style/SermonList.css";
import "./style/Calendar.css";
import SermonListItem from "./sermonListItem";

// ? Don't think this component is actually used
class Calendar extends Component {
  componentDidMount() {
    this.props.setTitle("Recent sermons");
    this.props.setView("guides");
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  render() {
    const { studies } = this.props;
    return (
      <Router basename="/">
        <section className="calendar">
          <div className="tablecloth" />
          { studies ? (
            studies.map((study) => (
              <div className="sermonList" key={study.date}>
                <Link to={{
                  pathname: `/study/${study.slug}`,
                }}
                >
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
      </Router>
    );
  }
}

export default Calendar;
