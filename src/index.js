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
				  <link rel="shortcut icon" type="image/x-icon" href="public/favicon.ico" />
					<link rel="stylesheet" type="text/css" href="public/css/index.css"/>
					<link rel="stylesheet" type="text/css" href="scripts/css/bootstrap.min.css"/>
					<link rel="stylesheet" href="roboto-font/index.css"/>
				</head>
				<body>
					{!hasErrorOccured && <div id="react-root" dangerouslySetInnerHTML={{
						__html: ReactDOMServer.renderToString(<App />)
					}}/>}
					{hasErrorOccured && <ErrorPage error={this.props.error} errorMsg={this.props.errorMsg}/>}
					<script src="public/bundle.js"/>
				</body>
			</html>
		)
	}
}

export default DefaultLayout;