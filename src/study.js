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
    this.props.setView('study');
  }

  render () {
    const { study } = this.props;

    if (study.url && study.url.substring(0, 4) !== 'http') {
      study.url = study.base_url + study.url;
    } 

    if (study.image && study.image.substring(0, 4) !== 'http') {
      study.image = study.base_url + study.image;
    } 

    return (
      <Router basename={`/study/${study.slug}`}>
        <div className="study">
          <Switch>
            <Route exact path="/" render={() => (
              <main className="study__introduction">

                {study.image && (
                  <div className="study__introduction__image">
                    <img src={study.image} alt="" className="" />
                  </div>
                )}

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
              <main>
                <div className="study__lead">
                  {study.image && (
                    <div className="study__lead__image">
                      <img src={study.image} alt="" />
                    </div>
                  )}
                  <div className="study__lead__icons">
                    <span className="study__lead__icons__icon">
                      <Icon icon="pray" classname="" />
                    </span>

                    <span className="study__lead__icons__icon">
                      <Icon icon="study" classname="" />
                    </span>
                  </div>
                </div>
                <section className="study__question question question--title-slide">
                  <h2 className="big_title">Start by praying for<br />this time.</h2>
                  <h2 className="big_title">Now read<br />{study.passage}</h2>
                  <a href={ `https://www.biblegateway.com/passage/?search=` + study.passage + `&version=NIVUK` } className="btn" target="_blank" rel="noopener">
                    View passage
                  </a>
                  <StudyFooter itemNo='0' itemCount={study.questions.length} baseRoute={`/study/${study.slug}`} />
                </section>
              </main>
            )} />

            <Route path="/finish" render={() => (
              <main>
                <div className="study__lead">
                  {study.image && (
                    <div className="study__lead__image">
                      <img src={study.image} alt="" />
                    </div>
                  )}
                  <div className="study__lead__icons">
                    <span className="study__lead__icons__icon">
                      <Icon icon="pray" classname="" />
                    </span>
                  </div>
                </div>
                <section className="study__question question question--title-slide">
                  <h2 className="big_title">Spend some time praying through what you have spoken about today.</h2>
                  <footer className="study__footer">
                    <Link to={`/${study.questions.length-1}`}>
                      <Icon icon="arrowLeft" classname="study__footer__icon study__footer__icon--left" />
                      Prev
                    </Link>
                    <Link to={`/`}>End</Link>
                  </footer>
                </section>
              </main>
            )} />

            <Route path="/:id" render={({ match }) => (
              <main>
                <Question question={study.questions[parseInt(match.params.id, 10)-1]} itemNo={match.params.id} />
                <StudyFooter itemNo={match.params.id} itemCount={study.questions.length} baseRoute={`/study/${study.slug}`} />
              </main>
            )} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default Study;
