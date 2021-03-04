import React, { Component } from "react";
import {
  BrowserRouter as Router, Route, Switch, Link,
} from "react-router-dom";
import PropTypes from "prop-types";
import Question from "./question";
import BiblePopup from "./BiblePopup";
import StudyHeader from "./studyHeader";
import StudyFooter from "./studyFooter";
import StudyLeadImage from "./StudyLeadImage";
import ExpandableText from "./expandableText";
import Icon from "./Icon";
import "./style/Study.css";

export default class Study extends Component {
  constructor(props) {
    super(props);
    const { study, image } = props;
    this.state = {
      biblePopup: false,
      image: study.image || image,
    };
  }

  componentDidMount() {
    const {
      setView, guideSlug, studySlug, setTitle, study,
    } = this.props;
    setView(
      `/guides/${guideSlug}/${studySlug}`,
    );
    setTitle(study.name);
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  closeBiblePopup() {
    this.setState({ biblePopup: false });
  }

  toggleBiblePopup(ev) {
    // KBB - This might not be needed now button type is defined
    if (ev) {
      ev.preventDefault();
    }
    this.setState((prevState) => ({ biblePopup: !prevState.biblePopup }));
  }

  render() {
    const { study, guideSlug, studySlug } = this.props;
    const { image, biblePopup } = this.state;

    return (
      <Router basename={`/guides/${guideSlug}/${studySlug}`}>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <main className="study__introduction">
                  {image && <StudyLeadImage image={image} />}

                  <section className="study__introduction__section">
                    <h2 className="pre_title">{study.passage}</h2>
                    <h1 className="big_title">{study.name}</h1>

                    {study.description && <p>{study.description}</p>}

                    <Link
                      className="btn btn--primary"
                      to={{ pathname: "/start" }}
                    >
                      Go to questions
                    </Link>
                  </section>

                  {study.website_url && (
                    <section className="study__introduction__section study__introduction__section--iconed">
                      <Icon icon="sound" classname="study__icon" />
                      <h2 className="dinky_title">Catch up</h2>
                      <p>
                        Missed the sermon on Sunday? Listen back to the
                        recording on the church website
                      </p>
                      <a
                        href={
                          `${study.website_url
                          }?utm_source=one21&utm_medium=webapp&utm_campaign=study`
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
                        expanded
                        scripture
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
                    {image && <StudyLeadImage image={image} />}

                    {!study.start && (
                      <div className="study__lead__icons">
                        <span className="study__lead__icons__icon">
                          <Icon icon="pray" classname="" />
                        </span>

                        {study.passage && (
                          <span className="study__lead__icons__icon">
                            <Icon icon="study" classname="" />
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <section className="study__question question question--title-slide">
                    {study.start ? (
                      <div dangerouslySetInnerHTML={{ __html: study.start }} />
                    ) : (
                      <div>
                        <h2 className="big_title">
                          Start by praying for
                          <br />
                          this time.
                        </h2>

                        {study.passage && (
                          <h2 className="big_title">
                            Now read
                            <br />
                            {study.passage}
                          </h2>
                        )}
                      </div>
                    )}

                    {study.scripture && (
                      <section className="study__introduction__section">
                        <h2 className="dinky_title">{study.passage}</h2>
                        <ExpandableText
                          expanded={false}
                          scripture
                          text={study.scripture}
                        />
                      </section>
                    )}

                    {!study.scripture
                      && study.passage && (
                        <button
                          type="button"
                          className="btn"
                          onClick={this.toggleBiblePopup.bind(this)}
                        >
                          View passage
                        </button>
                    )}
                  </section>

                  <StudyFooter
                    itemNo="0"
                    itemCount={study.questions.length}
                    baseRoute={`/study/${study.slug}`}
                  />
                </main>
              )}
            />

            <Route
              path="/finish"
              render={() => (
                <main>
                  <div className="study__lead">
                    {image && <StudyLeadImage image={image} />}

                    {!study.end && (
                      <div className="study__lead__icons">
                        <span className="study__lead__icons__icon">
                          <Icon icon="pray" classname="" />
                        </span>
                      </div>
                    )}
                  </div>

                  {study.end ? (
                    <section className="study__question question">
                      <div dangerouslySetInnerHTML={{ __html: study.end }} />
                    </section>
                  ) : (
                    <section className="study__question question question--title-slide">
                      <h2 className="big_title">
                        Spend some time thinking and praying through what you
                        have spoken about today.
                      </h2>
                    </section>
                  )}
                  <footer className="study__footer">
                    <Link to={`/${study.questions.length}`}>
                      <Icon
                        icon="arrowLeft"
                        classname="study__footer__icon study__footer__icon--left"
                      />
                      Prev
                    </Link>
                    <Link to="/">End</Link>
                  </footer>
                </main>
              )}
            />

            <Route
              path="/:id"
              render={({ match }) => (
                <main>
                  {image && <StudyLeadImage image={image} />}
                  <StudyHeader
                    name={study.name}
                    passage={study.passage}
                    passageLinked={!study.scripture}
                    toggleBiblePopup={this.toggleBiblePopup.bind(this)}
                  />
                  <Question
                    question={
                      study.questions[parseInt(match.params.id, 10) - 1]
                    }
                    itemNo={match.params.id}
                    scripture={study.scripture}
                    passage={study.passage}
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

          {biblePopup && (
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

Study.propTypes = {
  study: PropTypes.shape.isRequired,
  setView: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  guideSlug: PropTypes.string.isRequired,
  studySlug: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
