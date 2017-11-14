import React, { Component } from "react";

class Question extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { itemNo,  question } = this.props;
    window.scrollTo(0, 0);
    return (
      <section className="study__question question">
        <header className="question__header">
          <span>Question { itemNo }:</span>
          <h2>{question.lead}</h2>
        </header>

        { question.followup && (
          <ul className="question__subquestions">
            {question.followup.map((q, i) => (
              <li key={i}>{ q }</li>
            ))}
          </ul>
        )}
      </section>
    )
  }
}

export default Question;
