import React, { Component } from 'react';
import { Input, FormControl, Glyphicon } from 'react-bootstrap';
import Image from './Image';
import ImageList from './ImageList';
import Button from 'material-ui/Button';

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

	checkFileInput({ target }) {
		const { multipleFileUpload } = this.state;
		const files = [...target.files];
		const validFiles = files.every(file => (/([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.jpeg)$/g).test(file.name)) && files;

		if(!validFiles) {
			this.setState({ dropZoneMsg: 'Your file must be one of these extensions: [png, jpg, jpeg]' });
			return;
		}

		const reader = new FileReader();
		const newFile = validFiles[0];

		reader.onload = ({ target }) => {
			newFile.src = target.result;
			debugger;
			if(!multipleFileUpload) {
				this.setState({
					validFiles,
					disableFileUpload: true
				});
			} else {
				const validFiles = this.state.validFiles.concat(newFile).slice(); 
				this.setState({ validFiles });
			}
		};

		newFile && reader.readAsDataURL(newFile);
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
		const { validFiles, disableFileUpload, dropZoneMsg, multipleFileUpload } = this.state;
		return (
			<div className="Uploader">
				<div className="file-input">
					<div className="upload-icon"><Glyphicon glyph="upload"/></div>
					<div className="upload-message">{dropZoneMsg}</div>
					<FormControl
						type="file"
                        accept="image/x-png,image/jpeg,image/jpg"
						onChange={e => this.checkFileInput(e)} disabled={disableFileUpload}/>
					{validFiles && validFiles.map(({ src, name }) => <Image key={`${src}${name}`} url={src} name={name}/>)}
					{multipleFileUpload && <ImageList files={validFiles}/>}
				</div>
				<Button raised color="secondary" onClick={() => this.submitFile()} disabled={!validFiles}>Submit File</Button>
			</div>
		)
	}
}

export default Uploader;