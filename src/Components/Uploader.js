import React, { Component } from 'react';
import { Input, FormControl, Glyphicon } from 'react-bootstrap';
import Image from './Image';
import ImageList from './ImageList';
import Button from 'material-ui/Button';
import { DROPZONE, ICON, UP_CLASS } from '../helpers/constants';

import requestApi from '../helpers/request-api';

class Uploader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dropZoneMsg: DROPZONE.DRAG,
			onUploaderClass: '',
			disableFileUpload: false,
			glyphIcon: ICON.UPLOAD,
			validFiles: [],
			isUploading: false
		}
	}

	changeUploaderStyle(className) {
		switch(className) {
			case UP_CLASS.DRAG_OVER:
			case UP_CLASS.DRAG_ENTER:
				const onUploaderClass = this.state.onUploaderClass !== className && className;
				return onUploaderClass && this.setState({ onUploaderClass, glyphIcon: ICON.ARROW, dropZoneMsg: DROPZONE.DROP });
			default:
				return this.setState({ onUploaderClass: '', glyphIcon: ICON.UPLOAD, dropZoneMsg: DROPZONE.DRAG });
		}
	}

	checkFileInput({ target }) {
		const files = [...target.files];
		const targetFile = files.every(file => (/([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.jpeg)$/g).test(file.name)) && files[0];
		const { validFiles } = this.state;

		if(!targetFile) {
			delete target.files;
			this.setState({
				dropZoneMsg: DROPZONE.INVALID,
				glyphIcon: ICON.X,
				onUploaderClass: UP_CLASS.ERROR
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

	submitFiles() {
		const { validFiles } = this.state;
		requestApi('upload', { files: validFiles }).then(res => console.log(res));
	}

	render() {
		const { validFiles, disableFileUpload, dropZoneMsg, multipleFileUpload, onUploaderClass, glyphIcon } = this.state;
		const lastValidFile = !!validFiles.length && validFiles[validFiles.length - 1];
		return (
			<div className="Uploader">
				<div className={`file-input${onUploaderClass && ` ${onUploaderClass}`}`}>
					{!validFiles.length && <div className="upload-icon"><Glyphicon glyph={glyphIcon}/></div>}
					{!validFiles.length && <div className="upload-message"><span>{dropZoneMsg}</span></div>}
					<FormControl
						type="file"
						encType="multipart/form-data"
            accept="image/x-png,image/jpeg,image/jpg"
            name="upload"
            onDragEnter={() => this.changeUploaderStyle('drag-enter')}
            onDragOver={() => this.changeUploaderStyle('drag-over')}
            onDragLeave={() => this.changeUploaderStyle('drag-leave')}
						onChange={e => this.checkFileInput(e)}
						disabled={disableFileUpload}/>
						{!!lastValidFile && <Image key={lastValidFile.src} url={lastValidFile.src} name={lastValidFile.name}/>}
				</div>
				{validFiles.length > 1 && <ImageList files={validFiles}/>}
				<Button
					raised
					style={{ fontSize: '1.5vh' }}
					color="secondary"
					onClick={() => this.submitFiles()}
					disabled={!validFiles.length}
					>{`Submit File${validFiles.length > 1 ? `s [${validFiles.length}]` : ''}`}</Button>
			</div>
		)
	}
}

export default Uploader;