import React from "react";
import { string, number } from "prop-types";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const StudyFooter = ({ itemCount, itemNo }) => {
  const itemNumber = parseInt(itemNo, 10);
  return (
    <footer className="study__footer">

      { itemNumber > 1 && (
      <Link to={`/${itemNumber - 1}`}>
        <Icon icon="arrowLeft" classname="study__footer__icon study__footer__icon--left" />
        <span>Prev</span>
      </Link>
      )}

      {itemNumber === 1 && (
      <Link to="/start">
        <Icon icon="arrowLeft" classname="study__footer__icon study__footer__icon--left" />
        <span>Prev</span>
      </Link>
      )}

      {itemNumber === 0 && (
      <Link to="/">
        <span>Study overview</span>
      </Link>
      )}

      { itemNumber < itemCount && (
      <Link to={`/${itemNumber + 1}`}>
        <span>Next</span>
        <Icon icon="arrowRight" classname="study__footer__icon study__footer__icon--right" />
      </Link>
      )}

      {itemNumber === itemCount && (
      <Link to="/finish">
        <span>Reflect</span>
        <Icon icon="arrowRight" classname="study__footer__icon study__footer__icon--right" />
      </Link>
      )}

    </footer>
  );
};

StudyFooter.propTypes = {
  itemCount: number.isRequired,
  itemNo: string.isRequired,
};

export default StudyFooter;
