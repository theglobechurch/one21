import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icon';
import './style/Study.css';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    const churchData = JSON.parse(localStorage.getItem('church'));
    const bible = localStorage.getItem('bible');
    this.state = { churchData, bible }
  }

  componentDidMount() {
    this.props.setTitle('Settings');
    this.props.setView('profile');
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="study">
        <div className="tablecloth" />

        <section className="study__introduction__section">
          <p>One21 is a tool to help the church think through what we hear in a sermon on Sunday and discuss how we put it into practice in all aspects of our lives.</p>
        </section>

        { this.state.churchData && (
          <section className="study__introduction__section study__introduction__section--iconed">
            <Icon icon="church" classname="study__icon" />
            <h2 className="dinky_title">Church</h2>
            <p>
              <em>Coming soon…</em><br />
              Church: <strong>{ this.state.churchData.name }</strong>
            </p>
          </section>
        )}

        <section className="study__introduction__section study__introduction__section--iconed">
          <Icon icon="study" classname="study__icon" />
          <h2 className="dinky_title">Bible Translation</h2>
          <p>
            <em>Coming soon…</em><br />
            Translation: <strong>{ this.state.bible }</strong>
          </p>
        </section>

        <section className="study__introduction__section study__introduction__section--iconed">
          <Icon icon="translation" classname="study__icon" />
          <h2 className="dinky_title">one21 Language</h2>
          <p>
            <em>Coming soon…</em><br />
            Language: <strong>English-UK</strong>
          </p>
        </section>
      
        <section className="study__introduction__section study__introduction__section--iconed">
          <Icon icon="help" classname="study__icon" />
          <h2 className="dinky_title">Help</h2>
          <p>Stuck? Confused? Need a little bit of help?<br />Read the helpful help guide.</p>
          <Link
            to={{
              pathname: '/help'
            }}
            className="btn btn--primary">
            Go to help page
          </Link>
        </section>
      </div>
    )
  }

}
