import React, { Component } from 'react';
import {
  Button, Row, Col, Glyphicon,
  Input, Jumbotron, Table
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCode } from '../actions/code';
import { setSeconds, setTimes, setValue } from '../actions/run';
/*eslint-disable */
import brace from 'brace';
import braceMode from 'brace/mode/javascript';
import braceTheme from 'brace/theme/monokai';
/*eslint-enable */
import AceEditor from 'react-ace';

class Home extends Component {
  handleRunValueChange(value) {
    const { dispatch } = this.props;
    dispatch(setValue(value));
  }
  handleRunSecondsChange(e) {
    const { dispatch } = this.props;
    dispatch(setSeconds(e.target.value));
  }
  handleRunTimesChange(e) {
    const { dispatch } = this.props;
    dispatch(setTimes(e.target.value));
  }
  render() {
    const self = this;
    const { dispatch, code, run } = this.props;
    const titleStyle = {
      marginTop: 0,
      paddingBottom: 5,
      borderBottom: '1px solid #ccc'
    };
    return (
      <div>
        <Row>
          <Col md={6}>
            <AceEditor
              name="codeEditor"
              className="jumbotron"
              mode="javascript"
              theme="monokai"
              width="100%"
              value={code}
              onChange={(newValue) => {
                dispatch(setCode(newValue));
              }}
            />
          </Col>
          <Col md={6}>
            <Jumbotron style={{padding: 20}}>
              <h2 className="title text-center" style={{marginTop: 0}}>
                js-playground
                <br />
                <small>benchmark js snippets in a web worker</small>
              </h2>
              <hr />
              <Row>
                <Col md={5}>
                  <div className="text-center">
                    <Button bsStyle="danger">
                      <Glyphicon glyph="stop" />
                    </Button>
                    &nbsp;
                    <Button bsStyle="success">
                      <Glyphicon glyph="play" />
                      &nbsp;
                      Run
                    </Button>
                  </div>
                  <div>&nbsp;</div>
                  <Table condensed>
                    <tbody>
                      <tr>
                        <td>
                          <Input type="radio" label="Run Once"
                            onChange={self.handleRunValueChange.bind(self, 'once')}
                            checked={run.value === 'once'} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Input type="radio" label="Run for (# of seconds):"
                            onChange={self.handleRunValueChange.bind(self, 'seconds')}
                            checked={run.value === 'seconds'} />
                          <Input type="number" value={run.seconds}
                            onChange={self.handleRunSecondsChange.bind(self)} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Input type="radio" label="Run for (# of times):"
                            onChange={self.handleRunValueChange.bind(self, 'times')}
                            checked={run.value === 'times'} />
                          <Input type="number" value={run.times}
                            onChange={self.handleRunTimesChange.bind(self)} />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Input type="radio" label="Run Until Stopped"
                            onChange={self.handleRunValueChange.bind(self, 'forever')}
                            checked={run.value === 'forever'} />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md={7}>
                  <h4 style={titleStyle}>Stats</h4>
                  <h4 style={titleStyle}>Results</h4>
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(function (state) {
  return {
    code: state.code,
    run: state.run
  };
})(Home);
