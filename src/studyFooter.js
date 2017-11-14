import React, { Component } from "react";
import { Link } from 'react-router-dom';

class StudyFooter extends Component {
  render() {
    const { itemCount } = this.props;
    let itemNo = parseInt(this.props.itemNo, 10);
    return (
      <footer className="study__footer">

        { itemNo > 1 && (
          <Link to={`/${itemNo-1}`}>
            <span>Prev</span>
          </Link>
        )}

        {itemNo === 1 && (
          <Link to={`/start`}>
            <span>Prev</span>
          </Link>
        )}

        {itemNo === 0 && (
          <Link to={`/`}>
            <span>Study overview</span>
          </Link>
        )}

        { itemNo < itemCount && (
          <Link to={`/${itemNo+1}`}>
            <span>Next</span>
          </Link>
        )}
        
        {itemNo === itemCount && (
          <Link to={`/finish`}>
            <span>Pray</span>
          </Link>
        )}

      </footer>
    )
  }
}

export default StudyFooter;
