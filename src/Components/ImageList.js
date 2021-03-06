import React, { Component } from 'react'
import Image from './Image';

class ImageList extends Component {
    constructor(props) {
        super(props);
        this.state = { files: this.props.files }
    }

    componentWillReceiveProps({ files }) {
        files.length !== this.state.files.length && this.setState({ files });
    }

    render() {
        const { files } = this.state;
        console.log(files);
        return (
            <div className="ImageList">
                {files.map(({ src, name }) => <Image key={src} url={src} name={name} listItem={true}/>)}
            </div>
        )
    }
}

export default ImageList;