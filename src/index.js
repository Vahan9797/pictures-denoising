import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './Components/App';
import ErrorPage from './Components/ErrorPage';

class DefaultLayout extends Component {
	render() {
		const { error, errorMsg, browserSyncUrl } = this.props;
		const hasErrorOccured = error || errorMsg;
		return(
			<html lang="en">
				<head>
					<meta charSet="utf-8"/>
				  <meta name="description" content="Pictures Denoising"/>
				  <title>Pictures Denoising</title>
				  <link rel="shortcut icon" type="image/x-icon" href="/public/favicon.ico"/>
				  <link rel="icon" 					type="image/x-icon" href="/public/favicon.ico"/>
					<link rel="stylesheet" type="text/css" href="/public/css/index.css"/>
					<link rel="stylesheet" type="text/css" href="/scripts/css/bootstrap.min.css"/>
					<link rel="stylesheet" href="/roboto-font/index.css"/>
				</head>
				<body>
					{!hasErrorOccured && <div id="react-root" dangerouslySetInnerHTML={{
						__html: ReactDOMServer.renderToString(<App />)
					}}/>}
					{hasErrorOccured && <ErrorPage error={error} errorMsg={errorMsg}/>}
					<script src="/public/bundle.js"/>
					{browserSyncUrl && <script async src={`${browserSyncUrl}/browser-sync/browser-sync-client.js?v=2.23.6`}/>}
				</body>
			</html>
		)
	}
}

export default DefaultLayout;