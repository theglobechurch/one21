import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import PropTypes from "prop-types";
import SermonListItem from "./sermonListItem";
import Study from "./study";
import Card from "./card";
import ExpandableText from "./expandableText";
import './style/SermonList.css';

export default class Guide extends Component {

  state = {
    guide: null,
    sermon: false
  }

  componentDidMount() {
    this.props.setTitle('Loading…');
    this.props.setView(`/guides/${this.props.slug}`);

    // TODO: Only request if not already in state or local storage?
    if (this.isSermon()) {
      this.props.setTitle('Sermons');
      this.setState({
        guide: this.props.sermons,
        sermon: true
      });
    } else {
      this.requestJSON(`/${this.props.slug}.json`).then(guide => {
        this.props.setTitle(guide[0].name);
        this.setState({
          guide: guide[0],
          sermon: false
        });
      });
    }

    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
    
    // This feels like a hack
    const curPath = window.location.pathname.split('/').filter(String);
    if (this.state.guide && 
        this.props.title !== this.state.guide.name && 
        curPath.length === 2) {
      this.props.setTitle(this.state.guide.name)
    }

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

  isSermon() {
    if (this.props.slug === 'sermons') {
      return true
    } else {
      return false
    }
  }

  showListItem(i) {
    // Checks if the study should be shown in the study list.
    // If the first item is highlighted then the first should
    // be skipped
    const {guide} = this.state;
    if ((!guide.highlight_first) || (guide.highlight_first && i !== 0)) {
      return true
    } else {
      return false;
    }
  }

  selectStudy(studySlug) {
    return this.state.guide.studies.find(s => s.slug === studySlug)
  }

  render() {
    const { guide } = this.state;
    return(

      <div className="study">
        <div
          className="tablecloth"
        />

        <Switch>
          { guide && (
            <Route
              path="/guides/:guideSlug/:studySlug"
              render={({match}) => (
                <Study
                  {...this.state}
                  guideSlug={ match.params.guideSlug }
                  studySlug={ match.params.studySlug }
                  setView={this.props.setView}
                  setTitle={this.props.setTitle}
                  study={this.selectStudy(match.params.studySlug)}
                  image={guide.image}
                />
              )}
            />
          )}

          <Route
            path="/guides/:guideSlug"
            render={({match}) => (

              <main>
                
                {guide ? (
                  <div>
                    
                    {guide.image && (
                      <div className="study__introduction__image">
                        <img src={guide.image} alt="" className="" />
                      </div>
                    )}

                    { guide.highlight_first ? (
                      // ToDo: Update API to return images without needing the base_url joining
                      <Card
                        className="card--pullUp"
                        image={guide.studies[0].image}
                        title={guide.studies[0].name}
                        description={guide.studies[0].description}
                        description_limit={true}
                        cta="Go to study"
                        link={`/guides/${this.props.slug}/${guide.studies[0].slug}`}
                      />
                    ) : (
                      <section className="study__introduction__section">
                        <h1 className="big_title">{guide.name}</h1>
                        { guide.description && !this.state.sermon ? (
                          <ExpandableText
                            expanded={true}
                            text={guide.description}
                          />
                        ) : (
                          <p>
                            {guide.description}
                          </p>
                        )}
                      </section>
                    )}

                    { guide.studies && (
                      guide.studies.map((study, index) => (
                        <div key={index}>
                          { this.showListItem(index) && (
                            <Link
                              className="sermonList"
                              to={{
                                pathname: `/guides/${this.props.slug}/${study.slug}`
                              }}
                            >
                              <SermonListItem
                                {...study}
                                displayImage={false}
                                />
                            </Link>
                          )}
                        </div>
                      ))
                    )}

                    { guide.license && (
                      <section className="study__introduction__section">
                        <p
                          className="dinky_text"
                          dangerouslySetInnerHTML={{__html: guide.license }}
                        />
                      </section>
                    )}

                  </div>
                ) : (
                  <p>Loading guide...</p>
                )}
              </main>

            )}
          />
        </Switch>
        
  
      </div>
            
    );
  }
}

Guide.propTypes = {
  slug: PropTypes.string.isRequired
}
