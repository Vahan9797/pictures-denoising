const requestMapping = name => {
	const { origin } = window.location;
	return `${origin}/api/${name}`;
}

export default function requestApi(type, body, callback /*callback is optional*/) {
	const method = 'POST';
	const formData = new FormData();

	body.files.forEach(file => formData.append(type, file, file.name));
	const options = {
		method,
		body: formData,
		cache: 'no-cache',
		mode: 'cors',
		headers: {
			'Accept': 'application/json, application/xml, image/jpeg, image/jpg, image/x-png, *.*',
  		'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		}
	}

	return fetch(requestMapping(type), options).then(res => typeof callback === 'function' && callback(res) || res);
}