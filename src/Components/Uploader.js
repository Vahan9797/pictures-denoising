import React, { Component } from 'react';
import { Input, FormControl, Button } from 'react-bootstrap';

class Uploader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dropZoneMsg: 'Drag and Drop or Click on area to upload file(s)',
			multipleFileUpload: false,
			validFiles: false,
			isUploading: false
		}
	}

	checkFileInput(event) {
		const files = event.target.files;
		const validFiles = files.filter(file => (/([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.jpeg|.bmp)$/g).test(file.name));

		if(!validFiles.length) {
			this.setState({ dropZoneMsg: 'Your file is not an image.' });
			return;
		}

		if(!this.state.multipleFileUpload) {
			this.setState({ validFiles: validFiles[0] });
		} else {
			this.setState({validFiles});
		}
	}

	submitFile() {
		const reqBody = {

		}

		this.state.validFile && fetch('http://localhost:8080/upload-img', {
			method: 'POST',
			body: 
		});
	}

	render() {
		return (
			<div className="Uploader">
				<FormControl type="file" onChange={e => this.checkFileInput(e)}/>
				<Button bsStyle="success" onClick={() => this.submitFile()}>Submit File</Button>
			</div>
		)
	}
}

export default Uploader;