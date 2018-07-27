import React, { Component } from "react";
import Card from "./card";
import ChurchPicker from "./churchPicker";
import { ApiEndpoint } from "./App";
import "./style/Landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    let churchData = null;
    if (localStorage.getItem("church")) {
      churchData = JSON.parse(localStorage.getItem("church"));
    }
    this.state = { churchData };
  }

  componentDidMount() {
    this.props.setTitle(null);
    this.props.setView("/");
  }

  render() {
    const { study, guide } = this.props;
    const { churchData } = this.state;

    return (
      <main className="landing">
        <div className="tablecloth tablecloth--big" />
        <img className="landing__logo" src={`/one21logo.svg`} alt="one 21" />

        {!churchData && (
          <div>
            <div className="card">
              <div className="card__body">
                <ApiEndpoint.Consumer>
                  {endpoint => <ChurchPicker apiEndpoint={endpoint} />}
                </ApiEndpoint.Consumer>
              </div>
            </div>

            <Card
              image="/images/one21-happy-group-colourized.jpg"
              title="New to One21?"
              description="One21 is a tool to help the church think through what we hear in a sermon on Sunday and discuss how we put it into practice in all aspects of our lives."
              cta="Go to guide"
              link="/help"
            />
          </div>
        )}

        {study && (
          <Card
            image={study.image}
            pretitle="Latest sermon:"
            title={study.name}
            description={study.description}
            description_limit={true}
            cta="Go to study"
            link={`/guides/sermons/` + study.slug}
          />
        )}

        {guide && (
          <Card
            pretitle="Featured guide:"
            image={guide.image}
            title={guide.name}
            description={guide.teaser}
            description_limit={true}
            cta="Go to guide"
            link={`/guides/` + guide.slug}
          />
        )}
      </main>
    );
  }
}

export default Landing;
