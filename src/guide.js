import React, { Component } from 'react';
import PropTypes from "prop-types";
import SermonListItem from "./sermonListItem";
import './style/SermonList.css';

export default class Guide extends Component {

  state = {
    guide: null
  }

  componentDidMount() {
    this.props.setTitle('Loading…');
    this.props.setView("guides");

    // TODO: Only request if not already in state
    if(this.props.slug === 'sermons') {
      this.setState({ guide: this.props.sermons });
      this.props.setTitle('Recent sermons');
    } else {
      this.requestJSON(`/${this.props.slug}.json`).then(guide => {
        this.setState({ guide: guide[0] });

        this.props.setTitle(guide[0].name);
      });
    }

    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  requestJSON(feed_url, onSuccess, onFail) {
    return new Promise((resolve, reject) => {
      fetch(feed_url)
        .then(res => res.json())
        .then(feed_json => {
          resolve(feed_json);
        });
    });
  }

  render() {
    const { guide } = this.state;
    return(

      <div className="study">
        <div className="tablecloth" />
  
        <main className="study__introduction">
          {guide ? (
            <div>
              <h2>{guide.name}</h2>
              { guide.description && (
                guide.description.map((desc, index) => (
                  <p key={ index }>{ desc }</p>
                ))
              )}

              { guide.studies && (
                guide.studies.map((study, index) => (
                  <div className="sermonList" key={index}>
                    <SermonListItem
                      {...study}
                      displayImage={false}
                      />
                  </div>
                ))
              )}

              { guide.license && (
                <div className="">
                  <p dangerouslySetInnerHTML={{__html: guide.license }}></p>
                </div>
              )}

            </div>
          ) : (
            <p>Loading guide...</p>
          )}
        </main>
      </div>
            
    );
  }
}

Guide.propTypes = {
  slug: PropTypes.string.isRequired
}
