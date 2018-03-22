import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export default class Guides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      biblePopup: false
    };
  }

  componentDidMount() {
    this.props.setView("guides");
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  render() {
    const { guides } = this.props;

    return (
      <Router basename={`/guides`}>
        <div className="study">
          <div className="tablecloth" />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <main className="study__introduction">
                  Pick a guide…

                  { guides ? (
                    guides.map((guide, index) => (
                      <div className="" key={index}>
                        <Link to={{
                          pathname: `/${guide.slug}`
                        }}>
                          {guide.name}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div>Loading…</div>
                  )}
                  
                </main>
              )}
            />

            <Route
              path="/:slug"
              render={({ match}) => (
                <main>
                  { match.params.slug }
                </main>
              )}
            />

          </Switch>
        </div>
        
      </Router>

    );
  }
}
