import React, { useEffect, useState } from "react";
import {
  bool, string, shape, arrayOf, objectOf, func,
} from "prop-types";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import ChurchPicker from "../../components/ChurchPicker/ChurchPicker";
import ApiEndpoint from "../../ApiEndpoint";
import "./Landing.css";

const Landing = ({
  emptyState, guide = null, setView, setTitle, study = null,
}) => {
  const [churchData, setChurchData] = useState(null);
  const [guideDataPresent, setGuideDataPresent] = useState(false);

  const contentPresent = () => {
    setGuideDataPresent(
      study != null
      || guide != null
      || emptyState != null,
    );
  };

  useEffect(() => {
    setTitle(null);
    setView("/");

    if (!churchData && localStorage.getItem("church")) {
      setChurchData(JSON.parse(localStorage.getItem("church")));
    }

    contentPresent();
  }, [study, guide, emptyState]);

  return (
    <main className="landing">
      <div className="tablecloth tablecloth--big" />
      <img className="landing__logo" src="/one21logo.svg" alt="one 21" />

      {!churchData && (
        <div>
          <div className="card">
            <div className="card__body">
              <ApiEndpoint.Consumer>
                {(endpoint) => <ChurchPicker apiEndpoint={endpoint} />}
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

      {churchData && !guideDataPresent && <Loader />}

      {churchData && emptyState && (
        <Card
          image={churchData.lead_image}
          title={`${churchData.name} has not published any One21 guides yet…`}
          description="Please speak to your church administrator or leader for more information."
        />
      )}

      {study && (
        <Card
          image={study.image}
          pretitle="Latest sermon:"
          title={study.name}
          description={study.description}
          descriptionLimit
          cta="Go to study"
          link={`/guides/sermons/${study.slug}`}
        />
      )}

      {guide && (
        <Card
          pretitle="Featured guide:"
          image={guide.image}
          title={guide.name}
          description={guide.teaser}
          descriptionLimit
          cta="Go to guide"
          link={`/guides/${guide.slug}`}
        />
      )}
    </main>
  );
};

export default Landing;

Landing.propTypes = {
  emptyState: bool.isRequired,
  guide: shape({
    copyright: string,
    description: string,
    highlight_first: bool,
    image: string,
    images: objectOf(string),
    name: string,
    slug: string,
    teaser: string,
  }),
  setView: func.isRequired,
  setTitle: func.isRequired,
  study: shape({
    date: string,
    description: string,
    end: string,
    image: string,
    images: objectOf(string),
    name: string,
    passage: string,
    passage_ref: arrayOf(objectOf(string)),
    questions: arrayOf(shape({
      followup: arrayOf(string),
      lead: string,
      type: string,
    })),
    recording_url: string,
    scripture: arrayOf(string),
    slug: string,
    start: string,
    website_url: string,
  }),
};

// class Landing extends Component {
//   constructor(props) {
//     super(props);
//     let churchData = null;
//     if (localStorage.getItem("church")) {
//       churchData = JSON.parse(localStorage.getItem("church"));
//     }
//     this.state = { churchData, guideDataPresent: false };
//   }

//   componentDidMount() {
//     const { setTitle, setView } = this.props;
//     setTitle(null);
//     setView("/");
//   }

//   // TODO: Replace
//   // eslint-disable-next-line
//   UNSAFE_componentWillReceiveProps() {
//     this.contentPresent();
//   }

//   contentPresent() {
//     const { study, guide, emptyState } = this.props;
//     this.setState({ guideDataPresent: (study != null || guide != null || emptyState != null) });
//   }

//   render() {
//     const { study, guide, emptyState } = this.props;
//     const { churchData, guideDataPresent } = this.state;
//     return (
//     );
//   }
// }
