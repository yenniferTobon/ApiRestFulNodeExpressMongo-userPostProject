const serviceUser = require("../services/user");
const ReqFieldException = require("../exceptions/errorMiddleware");
//const userNotExistException = require("../exceptions/errorMiddleware");

exports.signUp = async (req, res) => {
	if (!req.body.username) {
		throw new ReqFieldException("Username field","requiredField", 404);
    }
    if (!req.body.email) {
		throw new ReqFieldException("Email field", "requiredField", 404);
	}
	if (!req.body.password) {
		throw new ReqFieldException("Password field", "requiredField", 404);
	}

	const user = await (await serviceUser.createUser(req.body)).toJSON();
	if (!user) {
		res.status(500).send({ error: "The user could not be created" });
	}
	delete user.password;
	res.status(201).send(user);
};

exports.signIn = async (req, res) => {
	const username = req.body.username;
	const pass = req.body.password;
	if (!username) {
		throw new ReqFieldException("Username field", "requiredField", 404);
	}
	if (!pass) {
		throw new ReqFieldException("Password field", "requiredField", 404);
	}
	const token = await serviceUser.signIn(username, pass);
	if (!token) {
		res.status(401).send({ error: "Autenticación fallida" });
	}
	res.status(200).json({ token: token });
};