import React, { Component } from 'react';

class Image extends Component {
    constructor(props) {
        super(props);
        const { url, name, listItem } = this.props;
        this.state = { url, name, showBrokenImg: !url || !name, listItem }
    }

    componentWillReceiveProps({ url, name }) {
        const showBrokenImg = !url || !name;
        this.setState({ url, name, showBrokenImg });
    }

    render() {
        const { url, name, showBrokenImg, listItem } = this.state;

        return (
            <div className={`Image${listItem && ' item'}`}>
                {!listItem && name && <div className="imgName">{name}</div>}
                {url && <img src={url} />}
                {showBrokenImg && <div className="broken-img-container">
                    <i className="broken-img-icon"></i>
                    {!listItem && <span className="broken-img-txt">
						Please make sure your image is not corrupted and try again.
					</span>}
                </div>}
            </div>
        )
    }
}

export default Image;