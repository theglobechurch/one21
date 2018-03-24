import React, { Component } from 'react';
import Icon from './icon';
import './style/Study.css';

class Help extends Component {

  componentDidMount() {
    this.props.setTitle('How to use one21');
    this.props.setView('help');
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
              <h1>One21?</h1>
              <p>One21 is a tool to help the church think through what we hear in a sermon on Sunday and discuss how we put it into practice in all aspects of our lives.</p>
            </section>

            <section className="study__introduction__section study__introduction__section--iconed">
              <Icon icon="group" classname="study__icon" />
              <h2 className="dinky_title">One-to-One</h2>
              <p>We want to grow together as a church and one-to-ones are a really key way we can do this. They help us build strong relationships, point each other to Jesus, and to apply what we're hearing on a Sunday to our lives.</p>
              <p>One21 is a tool to help facilitate one-to-ones by helping to direct what you read together, asking helpful questions based on a sermon you've already heard. You don't need a leader, or to have done any preperation, just meet together and discuss the questions.</p>
            </section>

            <section className="study__introduction__section study__introduction__section--iconed">
              <Icon icon="knifefork" classname="study__icon" />
              <h2 className="dinky_title">Twenty One?</h2>
              <p>Each week you eat twenty one meals. Who could you meet up with? Perhaps over a meal, or just for a drink?</p>
            </section>

            <section className="study__introduction__section study__introduction__section--iconed">
              <Icon icon="question" classname="study__icon" />
              <h2 className="dinky_title">Questions</h2>
              <p>Each week, by Monday breakfast time, you'll find a recording from Sunday's sermon and several questions to help you think and discuss some of the application points from Sunday.</p>
              <p>For each main question there will be some follow up questions to help you think through specific areas. Some of these will be more or less relevant to you; don't worry about doing all of them, focus on the relevant ones.</p>
            </section>
          </div>
        </div>

        <div className="card">
          <div className="card__body">

            <section className="study__introduction__section study__introduction__section--iconed">
              <Icon icon="apple" classname="study__icon" />
              <h2 className="dinky_title">iOS</h2>
              <p>You can add one21 to your home screen by pressing the share button and then pressing <strong>Add to Home Screen</strong>.</p>
            </section>

            <section className="study__introduction__section study__introduction__section--iconed">
              <Icon icon="android" classname="study__icon" />
              <h2 className="dinky_title">Android</h2>
              <p>You can add one21 to your home screen by pressing the menu button (three dots on the top right) and then pressing <strong>Add to Home Screen</strong>.</p>
            </section>
          </div>
        </div>

        <div className="card">
          <div className="card__body">

            <section className="study__introduction__section study__introduction__section--iconed">
              <Icon icon="cookie" classname="study__icon" />
              <h2 className="dinky_title">Privacy</h2>
              <p>One21 uses Google Tag Manager and Analytics to record how visitors use this service to enable improvements to be made in the future. No personally identifying data is recorded.</p>
            </section>
          </div>
        </div>
      </main>
    )
  }

}

export default Help;