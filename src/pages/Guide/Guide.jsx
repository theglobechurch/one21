import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import {
  func, string, shape, objectOf,
} from "prop-types";
import SermonListItem from "../../components/SermonListItem/SermonListItem";
import Study from "../Study/Study";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import ExpandableText from "../../components/ExpandableText/ExpandableText";
import "../../style/SermonList.css";

const Guide = ({
  slug, apiEndpoint, setTitle, setView, church, title = null,
}) => {
  const [guide, setGuide] = useState(null);
  const [sermon, setSermon] = useState(false);

  const isSermon = (s) => {
    if (s === "sermons") {
      return true;
    }
    return false;
  };

  const requestJSON = (feedUrl) => new Promise((resolve) => {
    fetch(feedUrl)
      .then((res) => res.json())
      .then((feedJson) => {
        resolve(feedJson);
      }).catch(() => resolve(false));
  });

  const showListItem = (i) => {
    if (guide && i !== 0) {
      return true;
    }

    if (
      !sermon
      && (!guide.highlight_first || (guide.highlight_first && i !== 0))
    ) {
      return true;
    }

    return false;
  };

  const selectStudy = (studySlug) => guide.studies.find((s) => s.slug === studySlug);

  useEffect(() => {
    const churchSlug = church.slug;
    setTitle(title);
    setView(`/guides/${slug}`);

    requestJSON(
      `${apiEndpoint}church/${churchSlug}/guides/${slug}`,
    ).then((g) => {
      if (!g) {
        window.location.href = "/guides";
        return;
      }

      setTitle(g.name);
      setGuide(g);
      setSermon(isSermon(slug));
    });

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="study">
      <div className="tablecloth" />

      <Switch>
        {guide && (
        <Route
          path="/guides/:guideSlug/:studySlug"
          render={({ match }) => (
            <Study
              guide={guide}
              sermon={sermon}
              guideSlug={match.params.guideSlug}
              studySlug={match.params.studySlug}
              setView={setView}
              setTitle={setTitle}
              study={selectStudy(match.params.studySlug)}
              image={guide.image}
            />
          )}
        />
        )}

        <Route
          path="/guides/:guideSlug"
          render={() => (
            <main>
              {guide ? (
                <div>
                  {guide.image && (
                  <div
                    className="study__introduction__image"
                    style={{ backgroundImage: `url(${guide.image})` }}
                  />
                  )}

                  {guide.highlight_first || sermon ? (
                    <Card
                      className="card--pullUp"
                      image={guide.studies[0].image}
                      title={guide.studies[0].name}
                      description={guide.studies[0].description}
                      descriptionLimit
                      cta="Go to study"
                      link={`/guides/${slug}/${guide.studies[0].slug}`}
                    />
                  ) : (
                    <section className="study__introduction__section">
                      <h1 className="big_title">{guide.name}</h1>
                      {guide.description && guide.description.length >= 1 && !sermon ? (
                        <ExpandableText
                          expanded
                          text={guide.description}
                        />
                      ) : (
                        <p>{guide.description}</p>
                      )}
                    </section>
                  )}

                  {guide.studies
                          && guide.studies.map((study, index) => (
                            <div key={study.slug}>
                              {showListItem(index) === true && (
                                <Link
                                  className="sermonList"
                                  to={{
                                    pathname: `/guides/${slug}/${study.slug}`,
                                  }}
                                >
                                  <SermonListItem
                                    name={study.name}
                                    date={study.date}
                                    image={study.image}
                                    passage={study.passage}
                                    displayImage={false}
                                  />
                                  {/* <SermonListItem {...study} displayImage={false} /> */}
                                </Link>
                              )}
                            </div>
                          ))}

                  {guide.license && (
                  <section className="study__introduction__section">
                    <p className="dinky_text">{guide.license}</p>
                  </section>
                  )}
                </div>
              ) : (
                <main className="landing">
                  <div className="tablecloth" />
                  <div className="churchPickerPage">
                    <Loader message="Loading guide…" minHeight="379px" />
                  </div>
                </main>
              )}
            </main>
          )}
        />
      </Switch>
    </div>

  );
};

export default Guide;

Guide.propTypes = {
  slug: string.isRequired,
  apiEndpoint: string.isRequired,
  setTitle: func.isRequired,
  setView: func.isRequired,
  church: shape({
    email: string,
    lead_image: string,
    lead_images: objectOf(string),
    logo: string,
    logo_sq: string,
    logo_sq_large: string,
    name: string,
    slug: string,
    url: string,
  }).isRequired,
  title: string,
};
