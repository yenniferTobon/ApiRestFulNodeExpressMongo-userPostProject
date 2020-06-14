const contUser = require('../../controllers/user');
const authMiddle = require('../../middlewares/authentication');

module.exports = (router) => {
    router.route('/signup').post(contUser.signUp);
    router.route('/signin').post(contUser.signIn);
    router.route('/user').get(authMiddle, contUser.getAllUsers);
    router.route('/user/:userId').get(authMiddle, contUser.getUserId);
    router.route('/user/:usrId').patch(authMiddle, contUser.patchUserId);
    router.route('/user/:removeId').delete(authMiddle, contUser.removeUserId);
};
