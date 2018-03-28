import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import Question from './question';
import BiblePopup from './biblePopup';
import StudyHeader from './studyHeader';
import StudyFooter from './studyFooter';
import ExpandableText from "./expandableText";
import Icon from './icon';
import './style/Study.css';

export default class Study extends Component {
  constructor(props) {
    super(props);
    this.state = {
      biblePopup: false,
      image: this.props.study.image || this.props.image
    };
  }

  componentDidMount() {
    this.props.setView("guides");
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  closeBiblePopup() {
    this.setState({ biblePopup: false });
  }

  toggleBiblePopup(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.setState({ biblePopup: !this.state.biblePopup });
  }

  render() {
    const { study, guideSlug, studySlug } = this.props;
    let { image } = this.state;

    if (study.url && study.url.substring(0, 4) !== "http") {
      study.url = study.base_url + study.url;
    }

    if (image && image.substring(0, 4) !== "http") {
      image = study.base_url + image;
    }

    return (
      <Router basename={`/guides/${guideSlug}/${studySlug}`}>
        <div className="study">
          <div className="tablecloth" />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <main className="study__introduction">
                  { image && <StudyLeadImage image={image} /> }

                  <section className="study__introduction__section">
                    <h2 className="pre_title">{study.passage}</h2>
                    <h1 className="big_title">{study.name}</h1>

                    {study.description && <p>{study.description}</p>}

                    <Link
                      className="btn btn--primary"
                      to={{ pathname: `/start` }}
                    >
                      Go to questions
                    </Link>
                  </section>

                  {study.url && (
                    <section className="study__introduction__section study__introduction__section--iconed">
                      <Icon icon="sound" classname="study__icon" />
                      <h2 className="dinky_title">Catch up</h2>
                      <p>
                        Missed the sermon on Sunday? Listen back to the
                        recording on the church website
                      </p>
                      <a
                        href={
                          study.url +
                          `?utm_source=one21&utm_medium=webapp&utm_campaign=study`
                        }
                        className="btn"
                      >
                        Listen now
                      </a>
                    </section>
                  )}

                  {study.scripture && (
                    <section className="expandableText study__introduction__section study__introduction__section--iconed">
                      <Icon icon="study" classname="study__icon" />
                      <h2 className="dinky_title">{study.passage}</h2>
                      <ExpandableText
                        expanded={true}
                        scripture={true}
                        text={study.scripture}
                      />
                    </section>
                  )}

                </main>
              )}
            />

            <Route
              path="/start"
              render={() => (
                <main>
                  <div className="study__lead">
                    { image && <StudyLeadImage image={image} /> }
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
                    <h2 className="big_title">
                      Start by praying for<br />this time.
                    </h2>
                    <h2 className="big_title">
                      Now read<br />
                      {study.passage}
                    </h2>
                    {/* <div href={ `https://www.biblegateway.com/passage/?search=` + study.passage + `&version=NIVUK` } className="btn" target="_blank" rel="noopener"> */}
                    <div
                      className="btn"
                      onClick={this.toggleBiblePopup.bind(this)}
                    >
                      View passage
                    </div>
                    <StudyFooter
                      itemNo="0"
                      itemCount={study.questions.length}
                      baseRoute={`/study/${study.slug}`}
                    />
                  </section>
                </main>
              )}
            />

            <Route
              path="/finish"
              render={() => (
                <main>
                  <div className="study__lead">
                    { image && <StudyLeadImage image={image} /> }
                    <div className="study__lead__icons">
                      <span className="study__lead__icons__icon">
                        <Icon icon="pray" classname="" />
                      </span>
                    </div>
                  </div>
                  <section className="study__question question question--title-slide">
                    <h2 className="big_title">
                      Spend some time praying through what you have spoken about
                      today.
                    </h2>
                    <footer className="study__footer">
                      <Link to={`/${study.questions.length}`}>
                        <Icon
                          icon="arrowLeft"
                          classname="study__footer__icon study__footer__icon--left"
                        />
                        Prev
                      </Link>
                      <Link to={`/`}>End</Link>
                    </footer>
                  </section>
                </main>
              )}
            />

            <Route
              path="/:id"
              render={({ match }) => (
                <main>
                  <StudyHeader
                    name={study.name}
                    passage={study.passage}
                    toggleBiblePopup={this.toggleBiblePopup.bind(this)}
                  />
                  { image && <StudyLeadImage image={image} /> }
                  <Question
                    question={
                      study.questions[parseInt(match.params.id, 10) - 1]
                    }
                    itemNo={match.params.id}
                  />
                  <StudyFooter
                    itemNo={match.params.id}
                    itemCount={study.questions.length}
                    baseRoute={`/study/${study.slug}`}
                  />
                </main>
              )}
            />
          </Switch>


          { this.state.biblePopup && (
            // ToDo: Check is there is an internet connection…
            <BiblePopup
              passage={study.passage}
              toggleBiblePopup={this.toggleBiblePopup.bind(this)}
            />
          )}
        </div>
        
      </Router>

    );
  }
}

class StudyLeadImage extends Component {
  render () {
    const { image } = this.props;
    return (
      <div className="study__introduction__image">
        <img src={image} alt="" />
      </div>
    );
  }
}

Study.propTypes = {
  study: PropTypes.object.isRequired,
  setView: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  guideSlug: PropTypes.string.isRequired,
  studySlug: PropTypes.string.isRequired,
  image: PropTypes.string
}

StudyLeadImage.propTypes = {
  image: PropTypes.string.isRequired
}
