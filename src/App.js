import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './style/App.css';
import './style/SermonList.css';

import SermonListItem from './sermonListItem';
import Study from './study';
import CoreHeader from './coreHeader';
import CoreNav from './coreNav';

class App extends Component {
  state = {
    studies: null,
    view: ''
  }

  setView = (view, ev) => {
    this.setState( {view} );
  };

  setTitle = (title) => {
    this.setState( {title} );
  }

  setActiveStudy = (activeStudy) => {
    this.setState( { activeStudy });
  }

  componentDidMount() {
    fetch('http://dev.jamesdoc.com/sample.json')
      .then(res => res.json())
      .then(studies => {
        this.setState({ studies })
      });
  }

  render () {
    console.log(this.state);
    const { studies } = this.state;
    return (
      <Router path="/">
        <div className="app">

          <CoreHeader />

          <div className="container">

            <Route path="/calendar" render={({ match }) => (

              // { this.state.view === 'calendar' && (
                <div className="cal">
                  { studies ? (
                    studies.map(study => (
                      
                      <div className="sermonList" key={study.date}>
                        <Link to={{
                            pathname: `/study/${study.slug}`
                        }}>
                          <SermonListItem
                            {...study}
                            />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div>Loading…</div>
                  )}
                </div>
              // )}

            )} />

            { studies && (
              <Route path="/study/:studySlug" render={({ match }) => (
                <Study
                  { ...this.state }
                  // setView={this.setView}
                  // setTitle={this.setTitle}
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
