import React, { Component } from 'react';
import Icon from './icon';
import './style/Study.css';

class Calendar extends Component {

  componentDidMount() {
    this.props.setTitle('How to use one21');
    this.props.setView('guide');
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="study">
        <div className="tablecloth"></div>

        <main className="study__introduction">

          <div className="study__introduction__image">
            <img src={`/one21logo.svg`} alt="" className="" />
          </div>

          <section className="study__introduction__section">
            <h1>One21?</h1>
            <p>One21 is a tool to help the church think through what we hear in a sermon on Sunday and discuss how we put it into practice in all aspects of our lives.</p>
          </section>

          <section className="study__introduction__section study__introduction__section--iconed">
            <Icon icon="group" classname="study__icon" />
            <h2 className="dinky_title">One-to-One</h2>
            <p>We want to grow together as a church, one-to-ones are a really key way we can do this. They help us build strong relationships, point each other to Jesus, and to apply what we're hearing on a Sunday to our lives.</p>
            <p>One21 is a tool to help facilitate one-to-ones by helping to direct what you read together, asking helpful questions based on a sermon you've already heard. You don't need a leader, or to have done any preperation, just meet together and discuss the questions.</p>
          </section>

          <section className="study__introduction__section study__introduction__section--iconed">
            <Icon icon="knifefork" classname="study__icon" />
            <h2 className="dinky_title">Twenty One?</h2>
            <p>Each week you eat twenty one meals. Who could you meet up with over a meal, invite them into your home for dinner, share a sandwich at lunch, or just have a drink together and discuss the sermon with?</p>
          </section>

          <section className="study__introduction__section study__introduction__section--iconed">
            <Icon icon="question" classname="study__icon" />
            <h2 className="dinky_title">Questions</h2>
            <p>Each week, by Monday breakfast time, you'll find a recording from Sunday's sermon and several questions to help you think and discuss some of the application points from Sunday.</p>
            <p>Over a meal or a drink meet up with someone and begin to work your way through the questions. For each main question there will be some follow up questions to help you think through specific areas. Some of these questions will be more or less relevant to you; don't worry about doing all of them.</p>
            <p>Don't worry if you don't get through all the questions, some will take longer than others.</p>
          </section>

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
        </main>
      </div>
    )
  }

}

export default Calendar;
