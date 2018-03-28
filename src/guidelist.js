import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Card from './card';
import SermonListItem from "./sermonListItem";
import './style/SermonList.css';

export default class GuideList extends Component {

  componentDidMount() {
    this.props.setTitle('Guides');
    this.props.setView("guides");
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  render() {
    const { church, sermons, guides, promoted_guide } = this.props;

    return (
      <div className="study">
        <div className="tablecloth" />
        
        { sermons && (
          <Card
            pretitle={church.name}
            image={church.image}
            title="Sermons"
            cta="Go to recent sermons"
            link="/guides/sermons"
          />
        )}
        
        { promoted_guide && (
          <Card
            image={promoted_guide.image}
            pretitle="Featured guide:"
            title={promoted_guide.name}
            description={promoted_guide.teaser}
            cta="Go to guide"
            link={`/guides/` + promoted_guide.slug }
          />
        )}
        
        <div className="sermonList">
          { sermons && (
            <Link to={{
              pathname: `/guides/sermons`
            }}>
              <SermonListItem
                name="Latest sermons"
                passage="Think through how to apply what you heard on Sunday."
                displayImage={false}
                />
            </Link>
          )}
        </div>

        { guides && (
          guides.map((guide, index) => (
            <div className="sermonList" key={index}>
              <Link to={{
                  pathname: `/guides/${guide.slug}`
              }}>
                <SermonListItem
                  name={ guide.name }
                  passage={ guide.teaser }
                  displayImage={false}
                  />
              </Link>
            </div>
          ))
        )}
        
          
      </div>

    );
  }
}

GuideList.propTypes = {
  setTitle: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  sermons: PropTypes.array,
  guides: PropTypes.array,
  promoted_guide: PropTypes.object 
}
