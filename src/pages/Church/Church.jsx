import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ChurchPicker from "../../components/ChurchPicker/ChurchPicker";

const requestJSON = (feedUrl) => new Promise((resolve) => {
  fetch(feedUrl)
    .then((res) => res.json())
    .then((feedJson) => {
      resolve(feedJson);
    });
});

const Church = ({
  slug, apiEndpoint, setTitle, setView, history,
}) => {
  const [userChurch] = useState(JSON.parse(localStorage.getItem("church")));
  const [displayedChurch, setdisplayedChurch] = useState(null);
  const [currentSlug, setCurrentSlug] = useState(null);

  const setChurch = (ch) => {
    setdisplayedChurch(ch);
    setTitle(ch.name);
    setCurrentSlug(ch.slug);
  };

  const lookup = () => {
    requestJSON(`${apiEndpoint}church/${slug}`).then((ch) => {
      setChurch(ch);
    });
  };

  useEffect(() => {
    setTitle("Loading…");
    setView(`/church/${slug}`);
    lookup();
  }, [slug]);

  const confirmChurch = () => {
    localStorage.setItem("church", JSON.stringify(displayedChurch));
    history.push("/");
  };

  const showConfirmBtn = () => {
    if (!displayedChurch || !userChurch || userChurch.slug !== currentSlug) {
      return true;
    }

    return false;
  };

  return (
    <main className="landing">
      <div className="tablecloth" />

      <div className="churchPickerPage">
        {displayedChurch ? (
          <section className="card">
            {displayedChurch.lead_image && (
              <header>
                <img src={displayedChurch.lead_image} alt="" />
              </header>
            )}

            <div className="card__body">
              <p className="pre_title">Church details</p>
              <h1 className="big_title">{displayedChurch.name}</h1>
              <p>{displayedChurch.url}</p>
              <p>{displayedChurch.email}</p>

              {/* TODO: The confirm button needs styling  */}
              {showConfirmBtn() && (
                <button
                  type="button"
                  className="btn action_text"
                  onClick={confirmChurch}
                >
                  Set as my church
                </button>
              )}
            </div>
          </section>
        ) : (
          <main className="landing">
            <div className="tablecloth" />
            <div className="churchPickerPage">
              <Loader message="Loading church details…" minHeight="379px" />
            </div>
          </main>
        )}

        <ChurchPicker apiEndpoint={apiEndpoint} />
      </div>
    </main>
  );
};

export default withRouter(Church);

Church.propTypes = {
  slug: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
