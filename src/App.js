import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './style/App.css';
import Landing from './landing';
import Help from './help';
import Profile from './profile';
import Calendar from './calendar';
import Study from './study';
import Guides from './guides';
import CoreHeader from './coreHeader';
import CoreNav from './coreNav';

class App extends Component {
  state = {
    studies: null
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
      .then(studies => {
        this.setState({ studies: studies, latest_study: studies[0] });
      });

    this.requestJSON("/guides.json")
      .then(guides => {
        this.setState({
          guides: guides,
          promoted_guide: guides.filter(guide => guide.promote === true)[0]
        });
      })
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
    const { studies, guides } = this.state;

    return (
      <Router path="/">
        <div className="app">

          /* Todo: Remove if at root (`\`) */
          <CoreHeader title={this.state.title} />

          <div className="container">
            <Route
              path="/calendar"
              render={({ match }) => (
                <Calendar
                  studies={studies}
                  setTitle={this.setTitle}
                  setView={this.setView}
                />
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

            {studies && (
              <Route
                path="/study/:studySlug"
                render={({ match }) => (
                  <Study
                    {...this.state}
                    setActiveStudy={this.setActiveStudy}
                    setView={this.setView}
                    study={studies.find(s => s.slug === match.params.studySlug)}
                  />
                )}
              />
            )}
            
            {guides && (
              <Route
                path="/guides"
                render={({ match }) => (
                  <Guides
                    {...this.state}
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
                  study={this.state.latest_study}
                  guide={this.state.promoted_guide}
                  setTitle={this.setTitle}
                  setView={this.setView}
                />
              )}
            />
          </div>

          {studies && (
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
