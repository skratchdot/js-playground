import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import pathGet from 'object-path-get';
import GithubCorner from 'react-github-corner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import stringToCssName from '../helpers/stringToCssName';

class App extends Component {
  render() {
    const path = pathGet(this, 'this.children.props.route.path', '');
		const pageParams = pathGet(this, 'props.params', {});
		const githubUrl = 'https://github.com/skratchdot/js-playground';
    return (
      <div className={`page-${stringToCssName(path)}`}>
				<Grid>
					<Header pageParams={pageParams} />
					{this.props.children}
					<Footer />
					<GithubCorner href={githubUrl} />
				</Grid>
			</div>
    );
  }
}

export default App;
