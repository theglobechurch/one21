import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ChurchPicker.css";

const requestJSON = (feedUrl) => new Promise((resolve) => {
  fetch(feedUrl)
    .then((res) => res.json())
    .then((feedJson) => {
      resolve(feedJson);
    });
});

const ChurchPicker = ({ apiEndpoint }) => {
  const [churches, setChurches] = useState(null);
  const [foundChurches, setFoundChurches] = useState(null);

  useEffect(() => {
    // Preload the church list
    requestJSON(`${apiEndpoint}church`).then((churchList) => {
      setChurches(churchList);
    });
  }, []);

  const handleSelectChurch = () => {
    setFoundChurches(null);
  };

  const churchLookup = (event) => {
    const { value } = event.target;

    if (value.length < 3 || !churches) {
      setFoundChurches(null);
      return;
    }

    const lookup = churches.filter((ch) => (
      ch.name.toLowerCase().includes(value.toLowerCase())
    ));

    setFoundChurches(lookup);
  };

  return (
    <section className="churchPicker">
      <p>One21 works best when you connect it with your church:</p>
      <div className="churchPicker__inputGroup">
        <span className="churchPicker__bar" />

        <input
          id="churchPicker"
          className="churchPicker__input"
          onChange={churchLookup}
          type="text"
          required
        />

        <label
          htmlFor="churchPicker"
          className="churchPicker__label"
        >
          Find your church…
        </label>
      </div>

      {foundChurches && (
        <div className="churchPicker__result">
          <div className="churchPicker__result__list">
            {foundChurches.map((ch) => (
              <Link
                key={ch.slug}
                className="churchPicker__result__item"
                onClick={handleSelectChurch}
                to={{
                  pathname: `/church/${ch.slug}`,
                }}
              >
                <img src={ch.logo_sq} alt="" />
                <span>{ch.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ChurchPicker;

ChurchPicker.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
};
