/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ApiEndpoint from "./ApiEndpoint";

import "./style/App.css";
import Landing from "./Landing";
import About from "./pages/About/About";
import Church from "./Church";
import Profile from "./Profile";
import GuideList from "./Guidelist";
import Guide from "./Guide";
import CoreHeader from "./CoreHeader";
import CoreNav from "./CoreNav";

const one21Api = "https://builder.one21.org/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sermons: null,
      church: null,
      loading: false,
      emptyState: false,
    };
  }

  componentDidMount() {
    localStorage.setItem("bible", "ESV");
    this.loadContent();
  }

  componentDidUpdate() {
    const { church } = this.state;
    let stChurch;
    const nullSlug = { slug: null };
    const lsChurch = JSON.parse(localStorage.getItem("church")) || nullSlug;

    if (church) {
      stChurch = church;
    } else {
      stChurch = nullSlug;
    }

    if (stChurch.slug !== lsChurch.slug) {
      this.loadContent();
    }
  }

  handleFetchErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  setActiveStudy = (activeStudy) => {
    this.setState({
      activeStudy,
      title: activeStudy.name,
    });
  }

  setTitle = (title) => {
    this.setState({ title });
  }

  setView = (view) => {
    this.setState({ view });
  }

  hasCompletedLoad = () => {
    const { sermons, guides, promotedGuide } = this.state;

    if (guides) {
      if (!sermons && !promotedGuide) {
        this.setState({
          loading: false,
          promotedGuide: guides[0],
        });
      } else {
        this.setState({ loading: false });
      }
    }
  }

  requestJSON = (feedUrl) => new Promise((resolve, reject) => {
    fetch(feedUrl)
      .then(this.handleFetchErrors)
      .then((res) => res.json())
      .then((feedJson) => resolve(feedJson))
      .catch((err) => { reject(err); });
  })

  loadSermons = () => {
    const church = JSON.parse(localStorage.getItem("church"));
    if (!church) { return; }

    this.requestJSON(`${one21Api}church/${church.slug}/guides/sermons`)
      .then((churchFeed) => {
        const sermons = churchFeed.studies;

        this.setState(
          {
            sermons,
            latestSermon: sermons[0],
          },
          () => {
            this.hasCompletedLoad();
          },
        );
      });
  }

  loadContent = () => {
    const { loading } = this.state;
    const church = JSON.parse(localStorage.getItem("church"));

    if (loading === true || !church) { return; }

    this.setState(
      { loading: true },
      () => {
        this.setState({
          church,
          sermons: null,
          latestSermon: null,
          guides: null,
          promotedGuide: null,
        });

        const guidelist = `${one21Api}church/${church.slug}/guides`;
        this.requestJSON(guidelist)
          .then(
            (guides) => {
              this.setState(
                {
                  guides,
                  promotedGuide: guides.filter(
                    (guide) => guide.highlight_first === true,
                  )[0],
                },
                () => {
                  if (guides.filter((guide) => guide.slug === "sermons").length !== 0) {
                    this.loadSermons();
                  } else {
                    this.hasCompletedLoad();
                  }
                },
              );
            },
          )
          .catch(() => {
            this.setState({
              loading: false,
              emptyState: true,
            });
          });
      },
    );
  }

  render() {
    const {
      church, guides, title, latestSermon, promotedGuide, emptyState,
    } = this.state;

    let header;
    if (title != null) {
      header = <CoreHeader title={title} />;
    }
    return (
      <Router path="/">
        <div className="app">

          { header }

          <ApiEndpoint.Provider value={one21Api}>
            <div className="container">
              <Route
                path="/calendar"
                render={() => <Redirect to="/guides" />}
              />
              <Route path="/guide" render={() => <Redirect to="/guides" />} />
              <Route path="/help" render={() => <Redirect to="/about" />} />
              <Route
                path="/study/:slug"
                render={({ match }) => (
                  <Redirect to={`/guides/sermons/${match.params.slug}`} />
                )}
              />
              <Route
                path="/study/"
                render={() => <Redirect to="/guides/sermons" />}
              />

              <Route
                path="/profile"
                render={() => (
                  <Profile setTitle={this.setTitle} setView={this.setView} />
                )}
              />

              <Route
                path="/about"
                render={() => (
                  <About setTitle={this.setTitle} setView={this.setView} />
                )}
              />

              <Route
                path="/church/:churchSlug"
                render={({ match }) => (
                  <ApiEndpoint.Consumer>
                    {(endpoint) => (
                      <Church
                        setTitle={this.setTitle}
                        setView={this.setView}
                        apiEndpoint={endpoint}
                        slug={match.params.churchSlug}
                      />
                    )}
                  </ApiEndpoint.Consumer>
                )}
              />

              {guides
                && church && (
                  <Route
                    path="/guides/:guideSlug"
                    render={({ match }) => (
                      <ApiEndpoint.Consumer>
                        {(endpoint) => (
                          <Guide
                            church={church}
                            title={title}
                            slug={match.params.guideSlug}
                            studySlug={match.params.studySlug}
                            apiEndpoint={endpoint}
                            setTitle={this.setTitle}
                            setView={this.setView}
                          />
                        )}
                      </ApiEndpoint.Consumer>
                    )}
                  />
              )}

              {guides
                && church && (
                  <Route
                    exact
                    path="/guides"
                    render={() => (
                      <GuideList
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...this.state}
                        setTitle={this.setTitle}
                        setView={this.setView}
                      />
                    )}
                  />
              )}

              <Route
                exact
                path="/"
                render={() => (
                  <Landing
                    study={latestSermon}
                    guide={promotedGuide}
                    emptyState={emptyState}
                    setTitle={this.setTitle}
                    setView={this.setView}
                  />
                )}
              />
            </div>
            <CoreNav {...this.state} />
          </ApiEndpoint.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
