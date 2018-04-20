import React, { Component } from "react";
import PropTypes from 'prop-types';
import './style/BiblePopup.css';

class BiblePopup extends Component {

  render() {
    return (
      <div className="biblePopup">
        <button
          className="btn"
          onClick={this.props.toggleBiblePopup}
        >
          Close
        </button>
        <iframe
          className="biblePopup__iframe"
          title={`Bible: ` + this.props.passage}
          marginWidth='0'
          marginHeight='0' 
          frameBorder='0' 
          src={ `https://www.biblegateway.com/passage/?search=` + this.props.passage + `&version=NIVUK` }
        />
      </div>
    )
  }
}

BiblePopup.propTypes = {
  passage: PropTypes.string.isRequired,
  toggleBiblePopup: PropTypes.func.isRequired
}

export default BiblePopup;
