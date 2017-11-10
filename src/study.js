import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Question from './question';
import StudyFooter from './studyFooter';
import './style/Study.css';

class Study extends Component {
  
  componentDidMount() {
    // if (this.props.view !== 'study') {
    //   this.props.setView('study');
    // }

    // if (this.props.title !== this.props.study.name) {
    //   this.props.setTitle(this.props.study.name);
    // }

    console.log(this.props);

    if (!this.props.activeStudy || this.props.activeStudy.name !== this.props.study.name) {
      console.log(`Setting active study: ${this.props.study.name}`)
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
              <div>
                Start…
                <StudyFooter itemNo={0} itemCount={study.questions.length} baseRoute={`/study/${study.slug}`} />
              </div>
            )} />

            <Route path="/finish" render={() => (
              <div>
                End…
              </div>
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
