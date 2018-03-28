import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './style/App.css';
import Landing from './landing';
import About from './about';
import Profile from './profile';
import Study from './study';
import GuideList from './guidelist';
import Guide from './guide';
import CoreHeader from './coreHeader';
import CoreNav from './coreNav';

class App extends Component {
  state = {
    sermons: null,
    church: { name: 'Your church' }
  };

  requestJSON(feed_url, onSuccess, onFail) {
    return new Promise((resolve, reject) => {
      fetch(feed_url)
        .then(res => res.json())
        .then(feed_json => { resolve(feed_json) });
    });
  }

  componentDidMount() {

    this.requestJSON("/one21.json")
      .then(churchFeed => {
        if (churchFeed instanceof Array) {
          // Original (legacy) One21 feed
          this.setState({
            sermons: churchFeed,
            latest_sermon: churchFeed[0]
          });
        } else {
          // New church feed
          this.setState({
            sermons: churchFeed.studies,
            latest_sermon: churchFeed.studies[0]
          });

          const church = churchFeed;
          delete church.studies
          localStorage.setItem('church', JSON.stringify(church));
          this.setState({church});
        }
      });

    this.requestJSON("/guides.json")
      .then(guides => {
        this.setState({
          guides: guides,
          promoted_guide: guides.filter(guide => guide.promote === true)[0]
        });
      });
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
    const { sermons } = this.state;

    return (
      <Router path="/">
        <div className="app">

          <CoreHeader title={this.state.title} />

          <div className="container">
            <Route
              path="/calendar"
              render={({ match }) => (
                <Redirect to="/guides" />
              )}
            />
            <Route
              path="/help"
              render={({ match }) => (
                <Redirect to="/about" />
              )}
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

            {sermons && (
              <Route
                path="/study/:studySlug"
                render={({ match }) => (
                  <Study
                    {...this.state}
                    setActiveStudy={this.setActiveStudy}
                    setView={this.setView}
                    study={sermons.find(s => s.slug === match.params.studySlug)}
                  />
                )}
              />
            )}
            
            {sermons && (
              <Route
                path="/guides/:guideSlug"
                render={({ match }) => (
                  <Guide
                    sermons={{
                      name: "Sermons",
                      slug: 'sermons',
                      image: this.state.church.image,
                      description: [`Latest sermons from ` + this.state.church.name],
                      highlight_first: true,
                      studies: sermons
                    }}
                    slug={match.params.guideSlug}
                    studySlug={match.params.studySlug}
                    setTitle={this.setTitle}
                    setView={this.setView}
                  />
                )}
              />
            )}
            
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

          {sermons && (
            <CoreNav
              {...this.state}
              setView={this.setView}
              currentView={this.state.view}
            />
          )}
        </div>
      </Router>
    );
  }
};

export default App;
