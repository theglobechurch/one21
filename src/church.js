import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "./loader";
import ChurchPicker from "./churchPicker";
import { withRouter } from "react-router-dom";

class Church extends Component {
  constructor(props) {
    super(props);
    const currentChurch = JSON.parse(localStorage.getItem("church"));
    this.state = {
      currentChurch: currentChurch,
      church: null,
      slug: null,
      lookup: false
    };
  }
  componentDidMount() {
    this.props.setTitle("Loading…");
    this.props.setView(`/church/${this.props.slug}`);
    this.lookup();
  }

  componentWillReceiveProps(nextProps) {
    const { slug } = nextProps;
    if (slug !== this.state.slug) {
      this.lookup();
    }
  }

  lookup() {
    if (this.state.lookup === true) {
      return;
    }

    this.setState({ lookup: true }, () => {
      const { apiEndpoint } = this.props;
      this.requestJSON(`${apiEndpoint}church/${this.props.slug}`).then(ch => {
        this.setChurch(ch);
      });
    });
  }

  setChurch(ch) {
    this.props.setTitle(ch.church_name);
    this.setState({ church: ch, slug: ch.slug, lookup: false });
    window.scrollTo(0, 0);
  }

  confirmChurch(ev) {
    const { church } = this.state;
    localStorage.setItem("church", JSON.stringify(church));
    this.props.history.push("/");
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

  showConfirmBtn() {
    const { currentChurch, church } = this.state;

    if (!currentChurch) {
      return true;
    }

    if (currentChurch.slug !== church.slug) {
      return true;
    }

    return false;
  }

  render() {
    const { church } = this.state;
    return (
      <main className="landing">
        <div className="tablecloth" />

        <div>
          {church ? (
            <section className="card">
              {church.lead_image && (
                <header>
                  <img src={church.lead_image} alt="" />
                </header>
              )}

              <div className="card__body">
                <p className="pre_title">Church details</p>
                <h1 className="big_title">{church.name}</h1>
                <p>{church.url}</p>
                <p>{church.email}</p>

                {this.showConfirmBtn() && (
                  <a
                    className="action_text"
                    onClick={this.confirmChurch.bind(this)}
                  >
                    Set as my church
                  </a>
                )}
              </div>
            </section>
          ) : (
            <Loader message="Loading church details…" />
          )}

          <ChurchPicker apiEndpoint={this.props.apiEndpoint} />
        </div>
      </main>
    );
  }
}

export default withRouter(Church);

Church.propTypes = {
  slug: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired
};
