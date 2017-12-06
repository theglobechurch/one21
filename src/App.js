import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import './style/App.css';
import Calendar from './calendar';
import Study from './study';
import CoreHeader from './coreHeader';
import CoreNav from './coreNav';

class App extends Component {
  state = {
    studies: null
  }

  setActiveStudy = (activeStudy) => {
    this.setState(
      {
        activeStudy: activeStudy,
        title: activeStudy.name
      }
    );
  }

  setTitle = (title) => {
    this.setState({title});
  }

  componentDidMount() {
    fetch('/sample.json')
      .then(res => res.json())
      .then(studies => {
        this.setState({ studies })
      });
  }

  render () {
    const { studies } = this.state;
    return (
      <Router path="/">
        <div className="app">

          <CoreHeader title={this.state.title} />

          <div className="container">

            <Route path="/calendar" render={({ match }) => (
              <Calendar
                studies={studies}
                setTitle={this.setTitle}
                />
            )} />

            { studies && (
              <Route path="/study/:studySlug" render={({ match }) => (
                <Study
                  { ...this.state }
                  setActiveStudy={this.setActiveStudy}
                  study={studies.find(s => s.slug === match.params.studySlug )} />
              )} />
            )}

          </div>

          { studies && (
            <CoreNav
              {...this.state}
              setView={ this.setView }
              currentView={ this.state.view }
              />
          )}
        </div>
      </Router>
    );
  }
};

export default App;
