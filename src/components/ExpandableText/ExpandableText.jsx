import React, { useState } from "react";
import PropTypes, { string } from "prop-types";
import { v4 as uuidv4 } from "uuid";
import parse from "react-html-parser";
import Icon from "../Icon/Icon";
import "./ExpandableText.css";

const ExpandableText = ({ expanded, scripture = null, text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [expandedClassList, setExpandedClassList] = useState(expanded ? "expandableText__container--contracted" : "");

  const toggleView = () => {
    setIsExpanded(!isExpanded);
    setExpandedClassList(isExpanded ? "expandableText__container--contracted" : "");
  };

  return (
    <div className="expandableText">
      <div className={`expandableText__container ${expandedClassList}`}>
        {text.map((p) => (
          <div
            className={`expandableText__container__block${scripture ? " expandableText__container__block--scripture" : ""}`}
            key={uuidv4()}
          >
            { parse(p) }
          </div>
        ))}
      </div>

      {expanded && (
        <button
          type="button"
          className="expandableText__button"
          onClick={toggleView}
        >
          {isExpanded ? (
            <span>Show less</span>
          ) : (
            <span>Keep Reading</span>
          )}
          <Icon icon="arrowRight" />
        </button>
      )}
    </div>
  );
};

export default ExpandableText;

ExpandableText.propTypes = {
  expanded: PropTypes.bool.isRequired,
  scripture: PropTypes.bool,
  text: PropTypes.arrayOf(string).isRequired,
};
