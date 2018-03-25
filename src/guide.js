import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import PropTypes from "prop-types";
import SermonListItem from "./sermonListItem";
import Study from "./study";
import './style/SermonList.css';

export default class Guide extends Component {

  state = {
    guide: null
  }

  componentDidMount() {
    this.props.setTitle('Loading…');
    this.props.setView("guides");

    // TODO: Only request if not already in state
    if (this.isSermon()) {
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

  isSermon() {
    if (this.props.slug === 'sermons') {
      return true
    } else {
      return false
    }
  }

  selectStudy(studySlug) {
    return this.state.guide.studies.find(s => s.slug === studySlug)
  }

  render() {
    const { guide } = this.state;
    return(

      <div className="study">
        <div className="tablecloth" />
        <Switch>
          { guide && (
            <Route
              path="/guides/:guideSlug/:studySlug"
              render={({match}) => (
                <Study
                  {...this.state}
                  guideSlug={ match.params.guideSlug }
                  studySlug={ match.params.studySlug }
                  setView={this.props.setView}
                  setTitle={this.props.setTitle}
                  study={this.selectStudy(match.params.studySlug)}
                />
              )}
            />
          )}

          <Route
            path="/guides/:guideSlug"
            render={({match}) => (

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
                        <Link
                          className="sermonList"
                          to={{
                            pathname: `/guides/${this.props.slug}/${study.slug}`
                          }}
                          key={index}
                        >
                          <SermonListItem
                            {...study}
                            displayImage={false}
                            />
                        </Link>
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

            )}
          />
        </Switch>
        
  
      </div>
            
    );
  }
}

Guide.propTypes = {
  slug: PropTypes.string.isRequired
}
