import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "./icon";

class StudyFooter extends Component {
  render() {
    const { itemCount } = this.props;
    const itemNo = parseInt(this.props.itemNo, 10);
    return (
      <footer className="study__footer">

        { itemNo > 1 && (
          <Link to={`/${itemNo - 1}`}>
            <Icon icon="arrowLeft" classname="study__footer__icon study__footer__icon--left" />
            <span>Prev</span>
          </Link>
        )}

        {itemNo === 1 && (
          <Link to="/start">
            <Icon icon="arrowLeft" classname="study__footer__icon study__footer__icon--left" />
            <span>Prev</span>
          </Link>
        )}

        {itemNo === 0 && (
          <Link to="/">
            <span>Study overview</span>
          </Link>
        )}

        { itemNo < itemCount && (
          <Link to={`/${itemNo + 1}`}>
            <span>Next</span>
            <Icon icon="arrowRight" classname="study__footer__icon study__footer__icon--right" />
          </Link>
        )}

        {itemNo === itemCount && (
          <Link to="/finish">
            <span>Reflect</span>
            <Icon icon="arrowRight" classname="study__footer__icon study__footer__icon--right" />
          </Link>
        )}

      </footer>
    );
  }
}

export default StudyFooter;
