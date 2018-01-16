import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './Components/App';
import ErrorPage from './Components/ErrorPage';

class DefaultLayout extends Component {
	render() {
		const hasErrorOccured = this.props.error || this.props.errorMsg;
		return(
			<html lang="en">
				<head>
					<meta charSet="utf-8"/>
				  <meta name="description" content="Pictures Denoising"/>
				  <title>Pictures Denoising</title>
					<link rel="stylesheet" type="text/css" href="public/css/index.css"/>
					<link rel="stylesheet" type="text/css" href="scripts/css/bootstrap.min.css"/>
				</head>
				<body>
					{!hasErrorOccured && <div id="react-root" dangerouslySetInnerHTML={{
						__html: ReactDOMServer.renderToString(<App />)
					}}></div>}
					{hasErrorOccured && <ErrorPage error={this.props.error} errorMsg={this.props.errorMsg}/>}
					<script src="public/bundle.js"></script>
				</body>
			</html>
		)
	}
}

export default DefaultLayout;