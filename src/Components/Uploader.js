import React, { Component } from 'react';
import { Input, FormControl } from 'react-bootstrap';

class Uploader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imageUrl: '',
			isUploading: false,
		}
	}

	handleFileInput(event) {
		alert('hey');
		let files = event.target.files;
		debugger;
		fetch('http://localhost:8080/upload-img', {
			method: 'POST',
			body: files
		})
	}

	render() {
		return (
			<div className="Uploader">
				<FormControl type="file" onChange={e => this.handleFileInput(e)}/>
			</div>
		)
	}
}

export default Uploader;