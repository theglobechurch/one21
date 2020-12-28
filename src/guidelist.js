import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "./card";
import SermonListItem from "./sermonListItem";
import "./style/SermonList.css";

export default class GuideList extends Component {
  componentDidMount() {
    this.props.setTitle("Guides");
    this.props.setView("/guides");
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0);
  }

  render() {
    const { church, guides, promoted_guide } = this.props;
    const sermon = guides.filter((g) => g.slug === "sermons")[0];

    return (
      <div className="study">
        <div className="tablecloth" />

        {sermon && (
          <Card
            pretitle={church.name}
            image={sermon.image}
            title={sermon.name}
            description={sermon.teaser}
            cta="Go to recent sermons"
            link={`/guides/${sermon.slug}`}
          />
        )}

        {promoted_guide && (
          <Card
            image={promoted_guide.image}
            pretitle="Featured guide:"
            title={promoted_guide.name}
            description={promoted_guide.teaser}
            cta="Go to guide"
            link={`/guides/${promoted_guide.slug}`}
          />
        )}

        {guides
          && guides.map((guide, index) => (
            <div className="sermonList" key={index}>
              <Link
                to={{
                  pathname: `/guides/${guide.slug}`,
                }}
              >
                <SermonListItem
                  name={guide.name}
                  passage={guide.teaser}
                  displayImage={false}
                />
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

GuideList.propTypes = {
  setTitle: PropTypes.func.isRequired,
  guides: PropTypes.array.isRequired,
  promoted_guide: PropTypes.object,
};
