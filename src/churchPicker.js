import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style/ChurchPicker.css";

export default class ChurchPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { foundChurches: null };
  }

  requestJSON(feed_url, onSuccess, onFail) {
    return new Promise((resolve, reject) => {
      fetch(feed_url)
        .then(res => res.json())
        .then(feed_json => {
          resolve(feed_json);
        });
    });
  }

  componentDidMount() {
    const { apiEndpoint } = this.props;
    this.requestJSON(`${apiEndpoint}church`).then(churchList => {
      this.setState({ churches: churchList });
    });
  }

  churchLookup(ev) {
    // TODO: Replace when more than 50 churches in One21. This will work for now
    const { value } = ev.target;

    if (value.length < 3 || !this.state.churches) {
      this.setState({ foundChurches: null });
      return;
    }

    const res = this.state.churches.filter(ch =>
      ch.name.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({ foundChurches: res });
  }

  onSelect() {
    this.setState({ foundChurches: null });
  }

  render() {
    return (
      <section className="churchPicker">
        <p>One21 works best when you connect it with your church:</p>

        <div className="churchPicker__inputGroup">
          <input
            className="churchPicker__input"
            onChange={this.churchLookup.bind(this)}
            type="text"
            required
          />
          <span className="churchPicker__bar" />
          <label className="churchPicker__label">Find your church…</label>
        </div>

        {this.state.foundChurches && (
          <div className="churchPicker__result">
            <div className="churchPicker__result__list">
              {this.state.foundChurches.map((ch, i) => (
                <Link
                  key={i}
                  className="churchPicker__result__item"
                  onClick={this.onSelect.bind(this)}
                  to={{
                    pathname: `/church/${ch.slug}`
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
  apiEndpoint: PropTypes.string.isRequired
};
