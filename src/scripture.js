import React, { Component } from 'react';
import PropTypes from "prop-types";
import Icon from './icon';
import './style/Scripture.css';

export default class Scripture extends Component {

  constructor(props) {
    super(props);
    this.container = null;
    this.state = {
      expanded: false
    }
  }

  componentDidMount() {
    if (this.props.expanded) {
      this.container = document.querySelector('.scripture__passage');

      if (this.container) {
        this.container.classList.toggle('scripture__passage--contracted');
      }
    }
  };

  toggleView(ev) {
    if (ev) { ev.preventDefault(); }
    if (this.container) {
      this.container.classList.toggle('scripture__passage--contracted');
    }
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { scripture, passageRef } = this.props;
    return (
      <section className="scripture study__introduction__section study__introduction__section--iconed">
        <Icon icon="study" classname="study__icon" />
        <h2 className="dinky_title">{ passageRef }</h2>
        <div className="scripture__passage">
          { scripture.map((p, i) => (
            <div
              className="scripture__passage__block"
              dangerouslySetInnerHTML={{__html: p}}
              key={i}
            ></div>
          ))}
        </div>

        { this.props.expanded && (
          <button
            className="scripture__button"
            onClick={this.toggleView.bind(this)}
          >
            { this.state.expanded ? (
              <span>Show less</span>
            ) : (
              <span>Keep Reading</span>
            )}
            <Icon icon="arrowRight" />
          </button>
        )}
      </section>
    );
  }

}

Scripture.propTypes = {
  expanded: PropTypes.bool.isRequired,
  scripture: PropTypes.array.isRequired,
  passageRef: PropTypes.string.isRequired
}
