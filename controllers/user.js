const serviceUser = require('../services/user');
const requiredField = require('../exceptions/errorMiddleware');
const invalidEmail = require('../exceptions/errorMiddleware');
const usernameNotExist = require('../exceptions/errorMiddleware');

exports.signUp = async (req, res) => {
    if (!req.body.username) {
        throw new ReqFieldException('Username field', 'requiredField', 404);
    }
    if (!req.body.email) {
        throw new ReqFieldException('Email field', 'requiredField', 404);
    }
    if (!/.+\@.+\..+/.test(req.body.email)) {
        throw new invalidEmail('invalid email', 'invalidEmail', 412);
    }
    if (!req.body.password) {
        throw new requiredField('Password field', 'requiredField', 404);
    }

    const user = await (await serviceUser.createUser(req.body)).toJSON();
    if (!user) {
        res.status(500).send({ error: 'The user could not be created' });
    }
    delete user.password;
    res.status(201).send(user);
};

exports.signIn = async (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;
    if (!username) {
        throw new requiredField('Username field', 'requiredField', 404);
    }
    if (!pass) {
        throw new requiredField('Password field', 'requiredField', 404);
    }
    const token = await serviceUser.signIn(username, pass);
    if (!token) {
        res.status(401).send({ error: 'Autenticación fallida' });
    }
    res.status(200).json({ token: token });
};

exports.getAllUsers = async (req, res) => {
    let allUsers = await serviceUser.allUsr();
    for (i = 0; i < allUsers.length; i++) {
        allUsers[i] = allUsers[i].toJSON();
        delete allUsers[i].password;
    }
    res.status(201).send(allUsers);
};

exports.getUserId = async (req, res) => {
    let infoUserId = await serviceUser.getUserToId(req.params.userId);
    if (infoUserId === null) {
        throw new usernameNotExist(
            'user with Id ' + req.params.userId + 'not exists',
            'usernameNotExist',
            400
        );
    }
    res.status(201).send(infoUserId);
};

exports.patchUserId = async (req, res) => {
    let infoUserPatch = await serviceUser.patchUserToId(
        req.params.usrId,
        req.body
    );
    res.status(201).send(infoUserPatch);
};

exports.removeUserId = async (req, res) => {
    let infoUserRemove = await serviceUser.removeUserToId(req.params.removeId);
    res.status(201).send(infoUserRemove);
};
