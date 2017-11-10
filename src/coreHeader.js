import React, { Component } from 'react';
import './style/CoreHeader.css';

class CoreHeader extends Component {

  render () {
    const { title } = this.props;
    return (
      <header className="coreHeader">

        121 (one twenty one)

        { title && (
          <span>: {title}</span>
        )}

      </header>
    );
  }
}

export default CoreHeader;
