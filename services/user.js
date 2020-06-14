const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../configs/config");
const bcrypt = require("bcrypt"); //to encrypt passwords
const usernameNotAvailable = require("../exceptions/errorMiddleware");
const ReqFieldException = require("../exceptions/errorMiddleware");
//const notAuthentication = require("../exceptions/notAuthentication");
const userNotExistException = require("../exceptions/errorMiddleware");
const invalidPasswordException = require("../exceptions/errorMiddleware");
//const userservice = require("./user");

exports.createUser = async user => {
	if (!user) {
		throw new ReqFieldException("user", "requiredField", 404);
	}
	let usernameExist = await userModel.findOne({ username: user.username });
	// validate
	if (usernameExist) {
		let msgError = "username" + user.username + "already exists";
		throw new usernameNotAvailable(msgError, "usernameNotAvailable", 401);
	}

	console.log(user);
	//const userEncrypt = await userservice.encryptPassword(user);
	return await userModel.create(user);
};

exports.signIn = async (usrname, pass) => {
	let userExist = await userModel.findOne({ username: usrname }); 
	if (!userExist) {
		let msgError = "user " + usrname + " not found";
		throw new userNotExistException(msgError, "usernameNotExist", 404);
	}

	console.log(pass);
	console.log(userExist.password);
	const validPassword = await bcrypt.compare(pass, userExist.password);
	/*if (!validPassword) {
		throw new invalidPasswordException("Incorrect password", "invalidPassword",  401);
	}*/
	//return the token by the user id
	const token = jwt.sign({ user: userExist._id }, config.SECRET, {
		expiresIn: 10000
	});
	return token;
};
