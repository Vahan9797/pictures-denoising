const requestMapping = name => {
	const origin = window.location.origin;
	return `${origin}/api/${name}`;
}

export default function requestApi(type, body, callback /*callback is optional*/) {
	const method = 'POST';
	return fetch(requestMapping(type), { method, body }).then(res => typeof callback === 'function' && callback(res) || res);
}