import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './style/App.css';
import Landing from './landing';
import Help from './help';
import Profile from './profile';
import Study from './study';
import GuideList from './guidelist';
import Guide from './guide';
import CoreHeader from './coreHeader';
import CoreNav from './coreNav';

class App extends Component {
  state = {
    sermons: null
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
      .then(sermons => {
        this.setState({ sermons: sermons, latest_sermon: sermons[0] });
      });

    this.requestJSON("/guides.json")
      .then(guides => {
        this.setState({
          guides: guides,
          promoted_guide: guides.filter(guide => guide.promote === true)[0]
        });
      });
    
    // Static set for now…
    const churchData = JSON.stringify({
      name: 'The Globe Church',
      slug: 'theglobechurch'
    });
    localStorage.setItem('church', churchData);
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
                <Redirect to="/guides"/>
              )}
            />

            <Route
              path="/profile"
              render={({ match }) => (
                <Profile setTitle={this.setTitle} setView={this.setView} />
              )}
            />

            <Route
              path="/help"
              render={({ match }) => (
                <Help setTitle={this.setTitle} setView={this.setView} />
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
                    sermons={{name: "Recent sermons", slug: 'sermons', description: ['Latest sermons from The Globe Church'], studies: sermons}}
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
