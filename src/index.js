import React, { Component } from 'react';
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
					<App />
				</body>
			</html>
		)
	}
}

export default DefaultLayout;