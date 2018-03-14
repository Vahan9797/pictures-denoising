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
			onUploaderClass: '',
			disableFileUpload: false,
			validFiles: false,
			isUploading: false
		}
	}

	changeUploaderStyle(className) {
		switch(className) {
			case 'drag-over':
			case 'drag-enter':
				return this.setState({ onUploaderClass: className });
			default:
				return this.setState({ onUploaderClass: '' });
		} 
	}

	checkFileInput({ target }) {
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
				this.setState({ validFiles });
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
		const { validFiles, disableFileUpload, dropZoneMsg, multipleFileUpload, onUploaderClass } = this.state;
		return (
			<div className="Uploader">
				<div className={`file-input${onUploaderClass && ` ${onUploaderClass}`}`}>
					<div className="upload-icon"><Glyphicon glyph="upload"/></div>
					<div className="upload-message"><span>{dropZoneMsg}</span></div>
					<FormControl
						type="file"
            accept="image/x-png,image/jpeg,image/jpg"
            onDragEnter={() => this.changeUploaderStyle('drag-enter')}
            onDragOver={() => this.changeUploaderStyle('drag-over')}
            onDragLeave={() => this.changeUploaderStyle('drag-leave')}
						onChange={e => this.checkFileInput(e)}
						disabled={disableFileUpload}/>
					{validFiles && validFiles.map(({ src, name }) => <Image key={src} url={src} name={name}/>)}
					{validFiles.length > 1 && <ImageList files={validFiles}/>}
				</div>
				<Button
					raised
					style={{ fontSize: '1.5vh' }}
					color="secondary"
					onClick={() => this.submitFile()}
					disabled={!validFiles}
					>{`Submit File${validFiles.length > 1 ? `s [${validFiles.length}]` : ''}`}</Button>
			</div>
		)
	}
}

export default Uploader;