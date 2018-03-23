import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icon';
import './style/Study.css';

export default class Profile extends Component {

  componentDidMount() {
    this.props.setTitle('Profile');
    this.props.setView('profile');
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <main className="landing">

        <div className="card">

          <div className="card__body">
            <section className="study__introduction__section">
              <p>One21 is a tool to help the church think through what we hear in a sermon on Sunday and discuss how we put it into practice in all aspects of our lives.</p>
            </section>

            <section className="study__introduction__section study__introduction__section--iconed">
              <Icon icon="help" classname="study__icon" />
              <h2 className="dinky_title">Help</h2>
              <p>Stuck? Confused? Need a little bit of help? Read our helpful help guide.</p>
              <Link
                to={{
                  pathname: '/help'
                }}
                className="btn">
                Go to help page
              </Link>
            </section>

            <section className="study__introduction__section study__introduction__section--iconed">
              <Icon icon="church" classname="study__icon" />
              <h2 className="dinky_title">Church</h2>
              <p>
                <em>Coming soon…</em><br />
                Church: <strong>The Globe Church</strong>
              </p>
            </section>

            <section className="study__introduction__section study__introduction__section--iconed">
              <Icon icon="study" classname="study__icon" />
              <h2 className="dinky_title">Bible Translation</h2>
              <p>
                <em>Coming soon…</em><br />
                Translation: <strong>ESV</strong>
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

          </div>
        </div>
        
      </main>
    )
  }

}
