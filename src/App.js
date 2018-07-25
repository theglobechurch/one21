import React, { Component, createContext } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./style/App.css";
import Landing from "./landing";
import About from "./about";
import Church from "./church";
import Profile from "./profile";
import GuideList from "./guidelist";
import Guide from "./guide";
import CoreHeader from "./coreHeader";
import CoreNav from "./coreNav";

const one21Api = "http://127.0.0.1:3010/api/";
export const ApiEndpoint = createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sermons: null,
      church: null,
      loading: false
    };
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

  componentDidMount() {
    localStorage.setItem("bible", "ESV");
    this.loadContent();
  }

  componentDidUpdate() {
    let stChurch;
    const nullSlug = { slug: null };
    const lsChurch = JSON.parse(localStorage.getItem("church")) || nullSlug;

    if (this.state.church) {
      stChurch = this.state.church;
    } else {
      stChurch = nullSlug;
    }

    if (stChurch.slug !== lsChurch.slug) {
      this.loadContent();
    }
  }

  loadContent() {
    const church = JSON.parse(localStorage.getItem("church"));

    if (this.state.loading === true || !church) {
      return;
    }

    this.setState(
      {
        loading: true
      },
      () => {
        this.setState({
          church: church,
          sermons: null,
          latest_sermon: null,
          guides: null,
          promoted_guide: null
        });

        if (church) {
          this.requestJSON(
            `${one21Api}church/${church.slug}/guides/sermons`
          ).then(churchFeed => {
            const sermons = churchFeed.studies;

            this.setState(
              {
                sermons: sermons,
                latest_sermon: sermons[0]
              },
              () => {
                this.hasCompletedLoad();
              }
            );
          });

          this.requestJSON(`${one21Api}church/${church.slug}/guides`).then(
            guides => {
              this.setState(
                {
                  guides: guides,
                  promoted_guide: guides.filter(
                    guide => guide.promote === true
                  )[0]
                },
                () => {
                  this.hasCompletedLoad();
                }
              );
            }
          );
        }
      }
    );
  }

  hasCompletedLoad() {
    const { sermons, guides } = this.state;
    if (sermons && guides) {
      this.setState({ loading: false });
    }
  }

  setActiveStudy = activeStudy => {
    this.setState({
      activeStudy: activeStudy,
      title: activeStudy.name
    });
  };

  setTitle = title => {
    this.setState({ title });
  };

  setView = view => {
    this.setState({ view });
  };

  render() {
    const { church, sermons } = this.state;
    return (
      <Router path="/">
        <div className="app">
          <CoreHeader title={this.state.title} />

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
                  <Redirect to={`/guides/sermons/` + match.params.slug} />
                )}
              />
              <Route
                path="/study/"
                render={() => <Redirect to="/guides/sermons" />}
              />

              <Route
                path="/profile"
                render={({ match }) => (
                  <Profile setTitle={this.setTitle} setView={this.setView} />
                )}
              />

              <Route
                path="/about"
                render={({ match }) => (
                  <About setTitle={this.setTitle} setView={this.setView} />
                )}
              />

              <Route
                path="/church/:churchSlug"
                render={({ match }) => (
                  <ApiEndpoint.Consumer>
                    {endpoint => (
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

              {sermons &&
                church && (
                  <Route
                    path="/guides/:guideSlug"
                    render={({ match }) => (
                      <ApiEndpoint.Consumer>
                        {endpoint => (
                          <Guide
                            church={this.state.church}
                            title={this.state.title}
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

              {sermons &&
                church && (
                  <Route
                    exact
                    path="/guides"
                    render={({ match }) => (
                      <GuideList
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
                render={({ match }) => (
                  <Landing
                    study={this.state.latest_sermon}
                    guide={this.state.promoted_guide}
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
