import React, { Component } from 'react';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SermonListItem from "./sermonListItem";

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
    const { guides } = this.props;

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
                  Pick a guide…

                  { guides ? (
                    guides.map((guide, index) => (
                      <div className="" key={index}>
                        <Link to={{
                          pathname: `/${guide.slug}`
                        }}>
                          {guide.name}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div>Loading…</div>
                  )}
                  
                </main>
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
                    <div classname="">
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
