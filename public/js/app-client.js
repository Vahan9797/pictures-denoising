import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/Components/App';
import ErrorPage from '../../src/Components/ErrorPage';

window.onload = () => {
	const reactRoot = document.querySelector('#react-root');
	reactRoot && ReactDOM.render(<App />, reactRoot);
}