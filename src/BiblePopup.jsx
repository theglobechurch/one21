import React from "react";
import PropTypes from "prop-types";
import "./style/BiblePopup.css";

const BiblePopup = ({ passage, toggleBiblePopup }) => (
  <div className="biblePopup">
    <button className="btn" type="button" onClick={toggleBiblePopup}>
      Close
    </button>
    <div className="biblePopup__iframe">
      <iframe
        className="biblePopup__iframe__int"
        title={`Bible: ${passage}`}
        marginWidth="0"
        marginHeight="0"
        frameBorder="0"
        src={
              `https://www.biblegateway.com/passage/?search=${
                passage
              }&version=NIVUK`
            }
      />
    </div>
  </div>
);

BiblePopup.propTypes = {
  passage: PropTypes.string.isRequired,
  toggleBiblePopup: PropTypes.func.isRequired,
};

export default BiblePopup;
