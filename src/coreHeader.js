import React, { Component } from 'react';
import './style/CoreHeader.css';

class CoreHeader extends Component {

  render () {
    return (
      <header className="coreHeader">

        one21

        {this.props.title && (
          <span>: {this.props.title}</span>
        )}

      </header>
    );
  }
}

export default CoreHeader;
