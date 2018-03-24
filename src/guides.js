import React, { Component } from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Card from './card';
import Calendar from './calendar';
import SermonListItem from "./sermonListItem";
import './style/SermonList.css';

export default class Guides extends Component {

  componentDidMount() {
    this.props.setTitle('Guides');
    this.props.setView("guides");
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  render() {
    const { sermons, guides, promoted_guide } = this.props;

    return (
      <Router basename={`/guides`}>
        <div className="study">
          <div className="tablecloth" />
          <Switch>

            <Route
              exact
              path="/"
              render={() => (
                <main className="study__introduction">
                  
                  { sermons && (
                    <Card
                      pretitle="The Globe Church"
                      title="Latest sermons"
                      cta="Go to sermon calendar"
                      link="/sermons"
                    />
                  )}
                  
                  { promoted_guide && (
                    <Card
                      pretitle="Featured guide:"
                      title={promoted_guide.name}
                      description={promoted_guide.teaser}
                      cta="Go to guide"
                      link={`/` + promoted_guide.slug }
                    />
                  )}
                  
                  <div className="sermonList">
                    { sermons && (
                      <Link to={{
                        pathname: `/sermons`
                      }}>
                        <SermonListItem
                          name="Latest sermons"
                          passage="Think about how to apply what you heard on Sunday."
                          displayImage={false}
                          />
                      </Link>
                    )}

                    { guides && (
                      guides.map((guide, index) => (
                        <div className="" key={index}>
                          <Link to={{
                              pathname: `/${guide.slug}`
                          }}>
                            <SermonListItem
                              name={ guide.name }
                              passage={ guide.teaser }
                              displayImage={false}
                              />
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                  
                </main>
              )}
            />

            <Route
              exact
              path="/sermons"
              render={({ match }) => (
                <Calendar
                  studies={sermons}
                  setTitle={this.props.setTitle}
                  setView={this.props.setView}
                />
              )}
            />

            <Route
              path="/:slug"
              render={({ match}) => (
                <main>
                  <Guide
                    slug={match.params.slug}
                  />
                </main>
              )}
            />

          </Switch>
        </div>
        
      </Router>

    );
  }
}


class Guide extends Component {
  state = {
    guide: null
  }

  componentDidMount() {
    // TODO: Only request if not already in state
    this.requestJSON(`/${this.props.slug}.json`).then(guide => {
      this.setState({ guide: guide[0] });
    });
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
      <Router basename={`/guides/${this.props.slug}`}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
            <div>
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
                        <Link to={{
                            pathname: `/${study.slug}`
                        }}>
                          <SermonListItem
                            {...study}
                            displayImage={false}
                            />
                        </Link>
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
            </div>
            )}
          />

          <Route
              path="/:slug"
              render={({ match}) => (
                <main>
                  { match.params.slug }
                </main>
              )}
            />
        </Switch>
      </Router>
    );
  }
}

Guide.propTypes = {
  slug: PropTypes.string.isRequired
}
