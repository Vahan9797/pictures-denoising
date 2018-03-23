import React, { Component } from 'react';
import { NOTIFICATION_DURATION } from './constants';

class Notification extends Component {
	constructor(props) {
		super(props);
		const { type, duration, status, message } = this.props;
		this.state = { type, duration, status, message }
	}

	componentWillReceiveProps(nextProps) {
		const { type, duration, status, message } = nextProps;
		this.setState({ type, duration, status, message });
	}

	componentDidMount() {
		setTimeout(() => this.props.onDurationEnd(), this.state.duration);
	}

	render() {
		const { type, duration, status, message } = this.state;
		<div className="Notification">
			<style dangerouslySetInnerHTML={{ __html: `
				.duration-time: {
					animation: Notification-Progress ${duration}ms linear;
				}
			`}}/>
			<div className={`notification-type type-${type}`}>
				{!isNaN(+status) && <div className="status-code">{status}</div>}
				{message && <div className="message">{message}</div>}
				<div className="duration-time"></div>
			</div>
		</div>
	}
}

export default function showNotification({
	type = 'info',
	status = 100,
	msg = 'Picture Denoising sucks.',
	duration = NOTIFICATION_DURATION
}, onDurationEnd) {
	return (<Notification type={type} status={status} message={msg} duration={duration} onDurationEnd={() => onDurationEnd()}/>);
}