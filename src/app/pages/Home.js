import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="text-center">
          <h1 className="title">
            js-playground
            <br />
            <small>benchmark js snippets in a web worker</small>
          </h1>
          <p>
            This is an example home page
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default connect()(Home);
