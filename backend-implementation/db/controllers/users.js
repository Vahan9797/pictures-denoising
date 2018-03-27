import Users from '../models/users';

export default class UsersController {
	static createUser({ username, email, password_digest, age }) {
		return Users.create({ username, email, password_digest, age });
	}

	static editUser(id, props) {
		// TODO
	}
}