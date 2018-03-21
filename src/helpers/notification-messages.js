import React, { Component } from 'react';

export default class Notification extends Component {
	constructor(props) {
		super(props);
		{ type, duration, status, message } = this.props;
		this.state = { type, duration, status, message }
	}

	render() {
		const { type, duration, status, message } = this.state;
		<div className="Notification">
			<style dangerouslySetInnerHTML={{ __html: `
				.duration-time: {
					transition: all ${duration}ms linear;
				}
			`}}/>
			<div className={`notification-type type-${type}`}>
				{!isNaN(+status) && <div className="status-code">{status}</div>}
				{message && <div className="message">{message}</div>}
			</div>
			<div className="duration-time"></div>
		</div>
	}
}