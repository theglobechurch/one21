import React, { Component } from 'react';
import Card from './card';
import './style/Landing.css';

class Landing extends Component {

  componentDidMount() {
    this.props.setTitle(null);
    this.props.setView('landing');
  }

  render() {
    const { study, guide } = this.props;

    if (study && study.image && study.image.substring(0, 4) !== 'http') {
      study.image = study.base_url + study.image;
    } 

    return (
      <main className="landing">
        <div className="tablecloth tablecloth--big"></div>
        <img className="landing__logo" src={`/one21logo.svg`} alt="one 21" />

        { study && (
          <Card
            image={study.image}
            pretitle="Latest sermon:"
            title={study.name}
            description={study.description}
            description_limit={true}
            cta="Go to study"
            link={`/study/` + study.slug}
          />
        )}

        { guide && (
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
    )
  }

}

export default Landing;
