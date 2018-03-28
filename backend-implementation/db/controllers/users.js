import Users from '../models/users';
import Image from '../models/image';

export default class UsersController {
	static createUser({ username, email, password_digest, age }) {
		if(!username || !email || !password_digest) {
			throw new Error();
		}
		return Users.create({ username, email, password_digest, age });
	}

	static editUser(id, props) {
		return Users.findById(id, {
			include: [{
				model: Image,
				as: 'Images'
			}]
		}).then(user => {
			if(!user) {
				return false;
			}

			return user.update(props);
		})
	}

	static listUsers(callerId) {

	}
}