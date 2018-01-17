import React, { Component } from 'react';
import { Input, FormControl, Button, Glyphicon } from 'react-bootstrap';

class Uploader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dropZoneMsg: 'Drag and Drop or Click on area to upload file(s)',
			multipleFileUpload: false,
			disableFileUpload: false,
			validFiles: false,
			isUploading: false
		}
	}

	checkFileInput(event) {
		const files = [...event.target.files];
		const validFiles = files.every(file => (/([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.jpeg|.bmp)$/g).test(file.name)) && files;
		
		if(!validFiles) {
			this.setState({ dropZoneMsg: 'Your file is not an image.' });
			return;
		}

		if(!this.state.multipleFileUpload) {
			this.setState({
				validFiles: validFiles[0],
				disableFileUpload: true
			});
		} else {
			this.setState({validFiles});
		}
	}

	submitFile() {
		const reqBody = {
			files: this.state.validFiles,
		}
		console.log('Submit');
/*		this.state.validFile && fetch('http://localhost:8080/upload-img', {
			method: 'POST',
			body: 
		});*/
	}

	render() {
		return (
			<div className="Uploader">
				<div className="file-input">
					<div className="upload-icon"><Glyphicon glyph="upload"/></div>
					<div className="upload-message">{this.state.dropZoneMsg}</div>
					<FormControl type="file" onChange={e => this.checkFileInput(e)} disabled={this.state.disableFileUpload}/>
				</div>
				<Button bsStyle="success" onClick={() => this.submitFile()} disabled={!this.state.validFiles}>Submit File</Button>
			</div>
		)
	}
}

export default Uploader;