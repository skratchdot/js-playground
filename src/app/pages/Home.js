import React, { Component } from 'react';
import {
  Button, Row, Col, Glyphicon,
  Input, Jumbotron, Table,
  Tabs, Tab, Alert
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCode } from '../actions/code';
import { setSeconds, setTimes, setValue } from '../actions/run';
import { setStats } from '../actions/stats';
/*eslint-disable */
import brace from 'brace';
import braceMode from 'brace/mode/javascript';
import braceTheme from 'brace/theme/monokai';
/*eslint-enable */
import AceEditor from 'react-ace';
const CodeWorker = require('worker?inline!../workers/code.js');
let worker;

class Home extends Component {
  executeCode() {
    const { dispatch, code, run } = this.props;
    this.terminateWorker();
    worker = new CodeWorker();
    worker.onmessage = function (e) {
      dispatch(setStats(e.data));
    };
    worker.onerror = function (err) {
      dispatch(setStats({
        runError: err.message
      }));
    };
    worker.postMessage({
      code: code,
      type: run.value,
      times: run.times,
      seconds: run.seconds
    });
  }
  terminateWorker() {
    if (worker) {
      worker.terminate();
      worker = null;
    }
  }
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
    const { dispatch, code, run, stats } = this.props;
    const titleStyle = {
      marginTop: 0,
      paddingBottom: 5,
      borderBottom: '1px solid #ccc'
    };
    const runValueStyle = {
      cursor: 'pointer'
    };
    const result = [];
    if (typeof stats.runError === 'string' && stats.runError.length) {
      result.push(<div>
        <Alert bsStyle="danger">
          <h4>An error occurred:</h4>
          <p>
            {stats.runError}
          </p>
        </Alert>
      </div>);
    } else {
      result.push(<AceEditor
        key="RESULT_OKAY"
        name="resultViewer"
        className="jumbotron"
        mode="javascript"
        width="100%"
        height={335}
        value={stats.runResult}
        showGutter={false}
        showPrintMargin={false}
        highlightActiveLine={false}
        readOnly={true}
      />);
    }
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
              height={605}
              value={code}
              onChange={(newValue) => {
                dispatch(setCode(newValue));
              }}
            />
          </Col>
          <Col md={6}>
            <Jumbotron className="home-info">
              <h2 className="title text-center" style={{marginTop: 0}}>
                js-playground
                <br />
                <small>benchmark js snippets in a web worker</small>
              </h2>
              <hr />
              <Row>
                <Col md={5}>
                  <div className="text-center">
                    <Button bsStyle="danger" onClick={self.terminateWorker.bind(self)}>
                      <Glyphicon glyph="stop" />
                    </Button>
                    &nbsp;
                    <Button bsStyle="success" onClick={self.executeCode.bind(self)}>
                      <Glyphicon glyph="play" />
                      &nbsp;
                      Run
                    </Button>
                  </div>
                  <div>&nbsp;</div>
                  <Table bordered condensed hover>
                    <tbody>
                      <tr style={runValueStyle}
                        className={run.value === 'once' ? 'active' : ''}
                        onClick={self.handleRunValueChange.bind(self, 'once')}>
                        <td>
                          <Input type="radio" label="Run Once"
                            checked={run.value === 'once'} />
                        </td>
                      </tr>
                      <tr style={runValueStyle}
                        className={run.value === 'seconds' ? 'active' : ''}
                        onClick={self.handleRunValueChange.bind(self, 'seconds')}>
                        <td>
                          <Input type="radio" label="Run for (# of seconds):"
                            checked={run.value === 'seconds'} />
                          <Input type="number" value={run.seconds}
                            onChange={self.handleRunSecondsChange.bind(self)} />
                        </td>
                      </tr>
                      <tr style={runValueStyle}
                        className={run.value === 'times' ? 'active' : ''}
                        onClick={self.handleRunValueChange.bind(self, 'times')}>
                        <td>
                          <Input type="radio" label="Run for (# of times):"
                            checked={run.value === 'times'} />
                          <Input type="number" value={run.times}
                            onChange={self.handleRunTimesChange.bind(self)} />
                        </td>
                      </tr>
                      <tr style={runValueStyle}
                        className={run.value === 'forever' ? 'active' : ''}
                        onClick={self.handleRunValueChange.bind(self, 'forever')}>
                        <td>
                          <Input type="radio" label="Run Until Stopped"
                            checked={run.value === 'forever'} />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md={7}>
                  <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title="Stats">
                      <h4 style={titleStyle}>Stats</h4>
                      <Table bordered condensed hover striped>
                        <tbody>
                          {['count', 'min', 'max', 'mean', 'sum'].map(function (key, i) {
                            /*
                            workerStart: 0,
                            workerEnd: 0,
                            workerTotal: 0,
                            runResult: '',
                            runError: ''
                             */
                            return (
                              <tr key={i}>
                                <th className="text-right">{key}</th>
                                <td width="100%">{stats[key]}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Tab>
                    <Tab eventKey={2} title="Result">
                      <h4 style={titleStyle}>Result</h4>
                      {result}
                    </Tab>
                  </Tabs>
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
    run: state.run,
    stats: state.stats
  };
})(Home);
