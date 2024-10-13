import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Card.css";

const limitText = (text, charCount = 100) => {
  if (text.length < (charCount + 20)) { return text; }
  const shortenedText = text.substring(0, charCount);
  const lastSpace = shortenedText.lastIndexOf(" ");

  return lastSpace > 0
    ? `${shortenedText.substring(0, lastSpace)}…`
    : `${shortenedText}…`;
};

const Card = ({
  className = null,
  description,
  descriptionLimit = null,
  image,
  pretitle = null,
  title,
  link,
  cta,
}) => (
  <section className={`card ${className || ""}`}>
    {image && (
      <header>
        <img src={image} alt="" />
      </header>
    )}

    <div className="card__body">
      {pretitle && (
        <p className="pre_title">{pretitle}</p>
      )}

      <h1 className="big_title">{title}</h1>

      {description && (
        <p>
          {descriptionLimit === true ? (
            limitText(description)
          ) : (
            description
          )}
        </p>
      )}

      {link && cta && (
        <Link
          to={{
            pathname: link,
          }}
          className="action_text"
        >
          {cta}
        </Link>
      )}
    </div>
  </section>
);

export default Card;

Card.propTypes = {
  title: PropTypes.string.isRequired,
  pretitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  descriptionLimit: PropTypes.bool,
  link: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
};
