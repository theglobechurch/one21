import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ApiEndpoint from "./ApiEndpoint";

import "./style/App.css";
import Landing from "./pages/Landing/Landing";
import About from "./pages/About/About";
import Church from "./pages/Church/Church";
import Profile from "./pages/Profile/Profile";
import GuideList from "./pages/GuideList/Guidelist";
import Guide from "./pages/Guide/Guide";
import CoreHeader from "./components/CoreHeader/CoreHeader";
import CoreNav from "./components/CoreNav/CoreNav";

const one21Api = "https://builder.one21.org/api/";

const App = () => {
  const [title, setTitle] = useState(null);
  const [view, setView] = useState("/");
  const [guides, setGuides] = useState([]);
  const [church, setChurch] = useState(JSON.parse(localStorage.getItem("church")));
  const [sermons, setSermons] = useState([]);
  const [promotedGuide, setPromotedGuide] = useState(null);
  const [latestSermon, setLatestSermon] = useState(null);
  const [emptyState, setEmptyState] = useState(false);
  const [loading, setLoading] = useState(false);
  let header;

  const handleFetchErrors = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };

  const requestJSON = (feedUrl) => new Promise((resolve, reject) => {
    fetch(feedUrl)
      .then(handleFetchErrors)
      .then((res) => res.json())
      .then((feedJson) => resolve(feedJson))
      .catch((err) => { reject(err); });
  });

  const hasCompletedLoad = () => {
    if (guides) {
      if (!sermons && !promotedGuide) {
        setPromotedGuide(guides[0]);
      }
      setEmptyState(false);
      setLoading(false);
    } else {
      setEmptyState(true);
    }
  };

  const loadSermons = () => {
    if (!church) { return; }

    requestJSON(`${one21Api}church/${church.slug}/guides/sermons`)
      .then((churchFeed) => {
        const loadedSermons = churchFeed.studies;
        setSermons(loadedSermons);
        hasCompletedLoad();
      });
  };

  useEffect(() => {
    if (sermons.length) {
      setLatestSermon(sermons[0]);
      setEmptyState(false);
    }
  }, [sermons]);

  useEffect(() => {
    if (guides.length) {
      setPromotedGuide(guides.filter(
        (g) => g.highlight_first === true,
      )[0]);
      setEmptyState(false);
    } else {
      setEmptyState(true);
      setSermons([]);
    }
  }, [guides]);

  const loadContent = () => {
    if (loading === true || !church) { return; }

    setLoading(true);

    const guidelist = `${one21Api}church/${church.slug}/guides`;

    requestJSON(guidelist)
      .then(
        (loadedGuides) => {
          setGuides(loadedGuides);

          if (loadedGuides.filter((guide) => guide.slug === "sermons").length !== 0) {
            loadSermons();
          } else {
            hasCompletedLoad();
          }
        },
      )
      .catch(() => {
        setLoading(false);
        setLatestSermon(null);
        setPromotedGuide(null);
        setEmptyState(true);
        setGuides([]);
        setSermons([]);
      });
  };

  useEffect(() => {
    localStorage.setItem("bible", "ESV");
    loadContent();
  }, [church]);

  if (title != null) {
    header = <CoreHeader title={title} />;
  }

  return (
    <Router path="/">
      <div className="app">

        {header}

        <ApiEndpoint.Provider value={one21Api}>
          <div className="container">
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
                <Profile setTitle={setTitle} setView={setView} />
              )}
            />

            <Route
              path="/about"
              render={() => (
                <About setTitle={setTitle} setView={setView} />
              )}
            />

            <Route
              path="/church/:churchSlug"
              render={({ match }) => (
                <ApiEndpoint.Consumer>
                  {(endpoint) => (
                    <Church
                      setTitle={setTitle}
                      setView={setView}
                      setChurch={setChurch}
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
                    {(endpoint) => (
                      <Guide
                        church={church}
                        title={title}
                        slug={match.params.guideSlug}
                        studySlug={match.params.studySlug}
                        apiEndpoint={endpoint}
                        setTitle={setTitle}
                        setView={setView}
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
                render={() => (
                  <GuideList
                    church={church}
                    guides={guides}
                    promotedGuide={promotedGuide}
                    setTitle={setTitle}
                    setView={setView}
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
                  setTitle={setTitle}
                  setView={setView}
                />
              )}
            />
          </div>

          <CoreNav view={view} guides={guides} />

        </ApiEndpoint.Provider>
      </div>
    </Router>
  );
};

export default App;
