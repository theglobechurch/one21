import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Question from './question';
import StudyFooter from './studyFooter';
import './style/Study.css';

class Study extends Component {
  
  componentDidMount() {
    if (!this.props.activeStudy || this.props.activeStudy.name !== this.props.title) {
      this.props.setActiveStudy(this.props.study);
    }
  }

  render () {
    const { study } = this.props;
    return (
      <Router basename={`/study/${study.slug}`}>
        <div className="study">
          <Switch>
            <Route exact path="/" render={() => (
              <section className="study__question question">
                { study.description ? (
                  <p>{ study.description }</p>
                ) : (
                  <p>No desc present in JSON</p>
                )}

                <div>
                  Go to questions: 
                  <Link
                    to={{
                      pathname: `/start`
                    }}>
                  Start…
                  </Link>
                </div>
              </section>
            )} />

            <Route path="/start" render={() => (
              <section className="study__question question">
                <p>Stop! Take some time to pray first</p>
                <p>Now read {study.passage}</p>
                <StudyFooter itemNo='0' itemCount={study.questions.length} baseRoute={`/study/${study.slug}`} />
              </section>
            )} />

            <Route path="/finish" render={() => (
              <section className="study__question question">
                <p>Spend some time praying through what you have spoken about today.</p>
                <footer className="study__footer">
                  <Link to={`/${study.questions.length-1}`}>Prev</Link>
                  <Link to={`/`}>End</Link>
                </footer>
              </section>
            )} />

            <Route path="/:id" render={({ match }) => (
              <div>
                <Question question={study.questions[parseInt(match.params.id, 10)-1]} itemNo={match.params.id} />
                <StudyFooter itemNo={match.params.id} itemCount={study.questions.length} baseRoute={`/study/${study.slug}`} />
              </div>
            )} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default Study;
