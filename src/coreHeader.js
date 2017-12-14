import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/CoreHeader.css';

class CoreHeader extends Component {

  render () {
    return (
      <header className="coreHeader">

        <Link to={{
          pathname: `/`
        }}>
          one21
        </Link>

        {this.props.title && (
          <span>: {this.props.title}</span>
        )}

      </header>
    );
  }
}

export default CoreHeader;
