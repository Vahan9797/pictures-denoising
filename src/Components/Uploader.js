import React, { Component } from 'react';
import { Input, FormControl, Glyphicon } from 'react-bootstrap';
import Image from './Image';
import ImageList from './ImageList';
import Button from 'material-ui/Button';
import { DROPZONE_VALID, DROPZONE_INVALID } from '../helpers/constants';

class Uploader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dropZoneMsg: DROPZONE_VALID,
			onUploaderClass: '',
			disableFileUpload: false,
			glyphIcon: 'upload',
			validFiles: [],
			isUploading: false
		}
	}

	changeUploaderStyle(className) {
		switch(className) {
			case 'drag-over':
			case 'drag-enter':
				const onUploaderClass = this.state.onUploaderClass !== className && className;
				return onUploaderClass && this.setState({ onUploaderClass });
			default:
				return this.setState({ onUploaderClass: '' });
		} 
	}

	checkFileInput({ target }) {
		const files = [...target.files];
		const targetFile = files.every(file => (/([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.jpeg)$/g).test(file.name)) && files[0];
		const { validFiles } = this.state;

		if(!targetFile) {
			delete target.files;
			this.setState({
				dropZoneMsg: DROPZONE_INVALID,
				glyphIcon: 'remove',
				onUploaderClass: 'error'
			});
			return;
		}

		const reader = new FileReader();

		reader.onload = ({ target }) => {
			targetFile.src = target.result;
			validFiles.push(targetFile);
				this.setState({ validFiles: validFiles.slice() });
		};

		targetFile && reader.readAsDataURL(targetFile);
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
		const { validFiles, disableFileUpload, dropZoneMsg, multipleFileUpload, onUploaderClass, glyphIcon } = this.state;
		return (
			<div className="Uploader">
				<div className={`file-input${onUploaderClass && ` ${onUploaderClass}`}`}>
					{!validFiles.length && <div className="upload-icon"><Glyphicon glyph={glyphIcon}/></div>}
					{!validFiles.length && <div className="upload-message"><span>{dropZoneMsg}</span></div>}
					<FormControl
						type="file"
            accept="image/x-png,image/jpeg,image/jpg"
            onDragEnter={() => this.changeUploaderStyle('drag-enter')}
            onDragOver={() => this.changeUploaderStyle('drag-over')}
            onDragLeave={() => this.changeUploaderStyle('drag-leave')}
						onChange={e => this.checkFileInput(e)}
						disabled={disableFileUpload}/>
					{!!validFiles.length && validFiles.map(({ src, name }) => <Image key={src} url={src} name={name}/>)}
					{validFiles.length > 1 && <ImageList files={validFiles}/>}
				</div>
				<Button
					raised
					style={{ fontSize: '1.5vh' }}
					color="secondary"
					onClick={() => this.submitFile()}
					disabled={!validFiles.length}
					>{`Submit File${validFiles.length > 1 ? `s [${validFiles.length}]` : ''}`}</Button>
			</div>
		)
	}
}

export default Uploader;