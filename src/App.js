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

const one21Api = "https://builder.one21.org/api/";
export const ApiEndpoint = createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sermons: null,
      church: null,
      loading: false,
      emptyState: false
    };
  }

  handleFetchErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  requestJSON(feed_url) {
    return new Promise((resolve, reject) => {
      fetch(feed_url)
        .then(this.handleFetchErrors)
        .then(res => res.json())
        .then(feed_json => resolve(feed_json))
        .catch(err => {
          reject(err);
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

  loadSermons() {
    const church = JSON.parse(localStorage.getItem("church"));
    if (!church) {
      return;
    }

    const localSermons = JSON.parse(localStorage.getItem("sermons"));

    if (localSermons) {
      this.setState(
        {
          sermons: localSermons,
          latest_sermon: localSermons[0]
        },
        () => {
          this.hasCompletedLoad();
        }
      );
    } else {
      this.requestJSON(`${one21Api}church/${church.slug}/guides/sermons`).then(
        churchFeed => {
          const sermons = churchFeed.studies;

          localStorage.setItem("sermons", JSON.stringify(sermons));

          this.setState(
            {
              sermons: sermons,
              latest_sermon: sermons[0]
            },
            () => {
              this.hasCompletedLoad();
            }
          );
        }
      );
    }
  }

  loadContent() {
    const church = JSON.parse(localStorage.getItem("church"));

    if (this.state.loading === true || !church) {
      return;
    }

    this.setState({ loading: true }, () => {
      this.setState({
        church: church,
        sermons: null,
        latest_sermon: null,
        guides: null,
        promoted_guide: null
      });

      const guidelist = `${one21Api}church/${church.slug}/guides`;
      this.requestJSON(guidelist)
        .then(guides => {
          this.setState(
            {
              guides: guides,
              promoted_guide: guides.filter(
                guide => guide.highlight_first === true
              )[0]
            },
            () => {
              if (
                guides.filter(guide => guide.slug === "sermons").length !== 0
              ) {
                this.loadSermons();
              } else {
                this.hasCompletedLoad();
              }
            }
          );
        })
        .catch(() => {
          this.setState({
            loading: false,
            emptyState: true
          });
        });
    });
  }

  hasCompletedLoad() {
    const { sermons, guides, promoted_guide } = this.state;

    if (guides) {
      if (!sermons && !promoted_guide) {
        this.setState({
          loading: false,
          promoted_guide: guides[0]
        });
      } else {
        this.setState({ loading: false });
      }
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
    const { church, guides } = this.state;
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

              {guides && church && (
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

              {guides && church && (
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
                    emptyState={this.state.emptyState}
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
