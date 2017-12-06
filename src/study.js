import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Question from './question';
import StudyFooter from './studyFooter';
import Icon from './icon';
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
              <main className="study__introduction">
                <section className="study__introduction__section">
                  <h2 className="pre_title">{ study.passage }</h2>
                  <h1 className="big_title">{ study.name }</h1>

                  { study.description && (
                    <p>{ study.description }</p>
                  )}
                  
                  <Link
                    className="btn btn--primary"
                    to={{
                      pathname: `/start`
                    }}>
                    Go to questions
                  </Link>
                </section>

                { study.url && (
                  <section className="study__introduction__section study__introduction__section--iconed">
                    <Icon icon="sound" classname="study__icon" />
                    <h2 className="dinky_title">Catch up</h2>
                    <p>Missed the sermon on Sunday? Listen back to the recording on the church website</p>
                    <a href={ study.url } className="btn">
                      Listen now
                    </a>
                  </section>
                )}

                <section className="study__introduction__section study__introduction__section--iconed">
                  <Icon icon="facebook" classname="study__icon" />
                  <h2 className="dinky_title">Share your reflections…</h2>
                  <p>Something stand out to you from this passage that would be helpful for the church? Share it on the community Facebook group:</p>
                  <a href="https://www.facebook.com/groups/globechurchcommunity/" className="btn">
                    Globe Community Group
                  </a>
                </section>
              </main>
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
