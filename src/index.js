import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './Components/App';

class DefaultLayout extends Component {
	render() {
		return(
			<html lang="en">
				<head>
					<meta charSet="utf-8"/>
				  <meta name="description" content="Pictures Denoising"/>
				  <title>Pictures Denoising</title>
					<link rel="stylesheet" type="text/css" href="css/index.css"/>
				</head>
				<body>
					<div id="react-root" dangerouslySetInnerHTML={{
						__html: ReactDOMServer.renderToString(<App />)
					}}></div>
					<script src="bundle.js"></script>
				</body>
			</html>
		)
	}
}

export default DefaultLayout;