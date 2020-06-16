const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const bcrypt = require('bcrypt');
const usernameNotAvailable = require('../exceptions/errorMiddleware');
const ReqFieldException = require('../exceptions/errorMiddleware');
const userNotExistException = require('../exceptions/errorMiddleware');
const invalidPasswordException = require('../exceptions/errorMiddleware');
const emailNotAvailable = require('../exceptions/errorMiddleware');
const userservice = require('./user');

exports.createUser = async (user) => {
    if (!user) {
        throw new ReqFieldException('user', 'requiredField', 404);
    }
    let usernameExist = await userModel.findOne({ username: user.username });
    // validate
    if (usernameExist) {
        let msgError = 'username ' + user.username + ' already exists';
        throw new usernameNotAvailable(msgError, 'usernameNotAvailable', 401);
    }
    let emailExist = await userModel.findOne({ email: user.email });
    // validate
    if (emailExist) {
        let msgError = 'email ' + user.email + ' already exists';
        throw new emailNotAvailable(msgError, 'emailNotAvailable', 401);
    }
    const userEncrypt = await userservice.encryptPassword(user);
    return await userModel.create(userEncrypt);
};

exports.signIn = async (usrname, pass) => {
    let userExist = await userModel.findOne({ username: usrname });
    if (!userExist) {
        let msgError = 'user ' + usrname + ' not found';
        throw new userNotExistException(msgError, 'usernameNotExist', 404);
    }

    const validPassword = await bcrypt.compare(pass, userExist.password);
    if (!validPassword) {
        throw new invalidPasswordException(
            'Incorrect password',
            'invalidPassword',
            401
        );
    }
    //return the token by the user id
    const token = jwt.sign(
        { user: userExist._id, email: userExist.email },
        config.SECRET,
        {
            expiresIn: '1h'
        }
    );
    return token;
};

exports.allUsr = async () => {
    let allusers = await userModel.find();
    return allusers;
};

exports.getUserToId = async (userId) => {
    if (!userId) {
        throw new ReqFieldException('el Id');
    }
    let infoUser;
    try {
        infoUser = await userModel.findById(userId).select({ password: 0 });
    } catch (err) {
        throw new NotAuthException('Id con estructura no Valida');
    }
    return infoUser;
};

exports.patchUserToId = async (id, infoChange) => {
    if (!id) {
        throw new ReqFieldException('el Id');
    }
    if (!infoChange) {
        throw new ReqFieldException('la informacion a modifica');
    }
    const userEncrypt = await userservice.encryptPassword(infoChange);
    const infoUserResult = await userModel
        .findByIdAndUpdate(id, userEncrypt, {
            new: true
        })
        .select({ password: 0 });
    return infoUserResult;
};

exports.removeUserToId = async (id) => {
    const removeUserPatch = await userModel.findByIdAndRemove(id);
    return removeUserPatch;
};

exports.encryptPassword = async (user) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt); // hash password
        user.password = hashedPassword;
    }
    return user;
};
