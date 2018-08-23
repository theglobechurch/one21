import React, { Component } from "react";
import PropTypes from "prop-types";
import ExpandableText from "./expandableText";

export default class Question extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { itemNo, question } = this.props;
    window.scrollTo(0, 0);
    return (
      <section className="study__question question">
        {question.lead && (
          <header className="question__header">
            <span>Question {itemNo}:</span>
            <h2>{question.lead}</h2>
          </header>
        )}

        {question.type === "pause" && (
          <header className="question__header">
            <span>Pause</span>
            <h2>{question.body}</h2>
          </header>
        )}

        {question.followup && (
          <ul className="question__subquestions">
            {question.followup.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        )}

        {this.props.scripture && (
          <section className="question__scripture">
            <h2 className="dinky_title">{this.props.passage}</h2>
            <ExpandableText
              expanded={true}
              scripture={true}
              text={this.props.scripture}
            />
          </section>
        )}
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  itemNo: PropTypes.string.isRequired,
  passage: PropTypes.string,
  scripture: PropTypes.array
};
