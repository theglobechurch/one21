import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style/ChurchPicker.css";

export default class ChurchPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { foundChurches: null };
  }

  componentDidMount() {
    const { apiEndpoint } = this.props;
    this.requestJSON(`${apiEndpoint}church`).then((churchList) => {
      this.setState({ churches: churchList });
    });
  }

  onSelect() {
    this.setState({ foundChurches: null });
  }

  requestJSON = (feedUrl) => new Promise((resolve) => {
    fetch(feedUrl)
      .then((res) => res.json())
      .then((feedJson) => {
        resolve(feedJson);
      });
  })

  churchLookup(ev) {
    // TODO: Replace when more than 50 churches in One21. This will work for now
    const { churches } = this.state;
    const { value } = ev.target;

    if (value.length < 3 || !churches) {
      this.setState({ foundChurches: null });
      return;
    }

    const res = churches.filter((ch) => ch.name.toLowerCase().includes(value.toLowerCase()));

    this.setState({ foundChurches: res });
  }

  render() {
    const { foundChurches } = this.state;
    return (
      <section className="churchPicker">
        <p>One21 works best when you connect it with your church:</p>

        <div className="churchPicker__inputGroup">

          <span className="churchPicker__bar" />

          <input
            id="churchPicker"
            className="churchPicker__input"
            onChange={this.churchLookup.bind(this)}
            type="text"
            required
          />

          {/* eslint jsx-a11y/label-has-associated-control: 0 */}
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
                  onClick={this.onSelect.bind(this)}
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
  }
}

ChurchPicker.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
};
