import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "../../components/Icon/Icon";
import "../../style/Study.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    // TODO - if "church" is invalid JSON the app will crash.
    // Maybe not likely, but maybe could be avoided
    const churchData = JSON.parse(localStorage.getItem("church"));
    const bible = localStorage.getItem("bible");
    this.state = { churchData, bible };
  }

  componentDidMount() {
    const { setTitle, setView } = this.props;
    setTitle("Settings");
    setView("/profile");
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const { churchData, bible } = this.state;
    return (
      <div className="study">
        <div className="tablecloth" />

        <section className="study__introduction__section">
          <p>
            One21 is a tool to help the church think through what we hear in a
            sermon on Sunday and discuss how we put it into practice in all
            aspects of our lives.
          </p>
        </section>

        {churchData && (
          <section className="study__introduction__section study__introduction__section--iconed">
            <Icon icon="church" classname="study__icon" />
            <h2 className="dinky_title">Church</h2>
            <p>
              Church:
              {" "}
              <strong>{churchData.name}</strong>
            </p>
            <p>
              <Link
                to={{
                  pathname: `/church/${churchData.slug}`,
                }}
              >
                Change church
              </Link>
            </p>
          </section>
        )}

        {!churchData && (
          <section className="study__introduction__section study__introduction__section--iconed">
            <Icon icon="church" classname="study__icon" />
            <h2 className="dinky_title">Church</h2>
            <p>
              <Link
                to={{
                  pathname: "/",
                }}
              >
                Select your church
              </Link>
            </p>
          </section>
        )}

        <section className="study__introduction__section study__introduction__section--iconed">
          <Icon icon="study" classname="study__icon" />
          <h2 className="dinky_title">Bible Translation</h2>
          <p>
            <em>Coming soon…</em>
            <br />
            Translation:
            {" "}
            <strong>{bible}</strong>
          </p>
        </section>

        <section className="study__introduction__section study__introduction__section--iconed">
          <Icon icon="translation" classname="study__icon" />
          <h2 className="dinky_title">Language</h2>
          <p>
            <em>Coming soon…</em>
            <br />
            Language:
            {" "}
            <strong>English-UK</strong>
          </p>
        </section>

        <section className="study__introduction__section study__introduction__section--iconed">
          <Icon icon="help" classname="study__icon" />
          <h2 className="dinky_title">Help</h2>
          <p>
            Stuck? Confused? Need a little bit of help?
            <br />
            Read the helpful
            help guide.
          </p>
          <Link
            to={{
              pathname: "/help",
            }}
            className="btn btn--primary"
          >
            Go to help page
          </Link>
        </section>
      </div>
    );
  }
}

Profile.propTypes = {
  setTitle: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
};
