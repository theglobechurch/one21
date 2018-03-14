import React, { Component } from "react";
import PropTypes from 'prop-types';
import './style/BiblePopup.css';

class BiblePopup extends Component {

  onClose(ev) {
    ev.preventDefault();
    this.props.closeBiblePopup();
  }

  render() {
    return (
      <div className="biblePopup">
        <iframe
          className="biblePopup__iframe"
          title={`Bible: ` + this.props.passage}
          marginWidth='0'
          marginHeight='0' 
          frameBorder='0' 
          src={ `https://www.biblegateway.com/passage/?search=` + this.props.passage + `&version=NIVUK` }
        />
        <button
          className="btn"
          onClick={this.onClose.bind(this)}
        >
          Close
        </button>
      </div>
    )
  }
}

BiblePopup.propTypes = {
  passage: PropTypes.string.isRequired,
  closeBiblePopup: PropTypes.func.isRequired
}

export default BiblePopup;