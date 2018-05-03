import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './style/App.css';
import Landing from './landing';
import About from './about';
import Profile from './profile';
import GuideList from './guidelist';
import Guide from './guide';
import CoreHeader from './coreHeader';
import CoreNav from './coreNav';

class App extends Component {
  state = {
    sermons: null,
    church: null,
  };

  requestJSON(feed_url, onSuccess, onFail) {
    return new Promise((resolve, reject) => {
      fetch(feed_url)
        .then(res => res.json())
        .then(feed_json => { resolve(feed_json) });
    });
  }

  componentDidMount() {

    this.requestJSON("https://www.globe.church/api/one21")
      .then(churchFeed => {
        this.setState({
          sermons: churchFeed.studies,
          latest_sermon: churchFeed.studies[0]
        });

        const church = churchFeed;
        delete church.studies
        localStorage.setItem('church', JSON.stringify(church));
        localStorage.setItem('bible', 'ESV');
        this.setState({church});
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
    const { church, sermons } = this.state;
    return (
      <Router path="/">
        <div className="app">

          <CoreHeader
            title={this.state.title}
          />

          <div className="container">
            <Route path="/calendar" render={() => (<Redirect to="/guides" />)} />
            <Route path="/guide" render={() => (<Redirect to="/guides" />)} />
            <Route path="/help" render={() => (<Redirect to="/about" />)} />
            <Route path="/study/:slug" render={({ match }) => (<Redirect to={`/guides/sermons/` + match.params.slug } />)} />
            <Route path="/study/" render={() => (<Redirect to="/guides/sermons" />)} />

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
            
            { sermons && church && (
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
                    title={this.state.title}
                    slug={match.params.guideSlug}
                    studySlug={match.params.studySlug}
                    setTitle={this.setTitle}
                    setView={this.setView}
                  />
                )}
              />
            )}
            
            { sermons && church && (
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

          {sermons && (
            <CoreNav
              {...this.state}
            />
          )}
        </div>
      </Router>
    );
  }
};

export default App;
