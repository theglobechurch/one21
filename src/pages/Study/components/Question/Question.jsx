import React, { useEffect } from "react";
import {
  string, arrayOf, shape,
} from "prop-types";
import ExpandableText from "../../../../components/ExpandableText/ExpandableText";

const Question = ({
  itemNo, question, passage, scripture, location = null,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <section className="study__question question">
      {question.lead && (
        <header className="question__header">
          <span>
            {`Question ${itemNo}:`}
          </span>
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
          {question.followup.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      )}

      {scripture && (
        <section className="question__scripture">
          <h2 className="dinky_title">{passage}</h2>
          <ExpandableText
            expanded
            scripture
            text={scripture}
          />
        </section>
      )}
    </section>
  );
};

export default Question;

Question.propTypes = {
  question: shape({
    followup: arrayOf(string),
    lead: string,
    type: string,
  }).isRequired,
  itemNo: string.isRequired,
  location: string,
  passage: string.isRequired,
  scripture: arrayOf(string).isRequired,
};
