const contPost = require('../../controllers/post');
const authMiddle = require('../../middlewares/authentication');

module.exports = (router) => {
    router.route('/post').post(authMiddle, contPost.createPost);
    router.route('/post').get(authMiddle, contPost.getAllPosts);
    router.route('/post/:postId').get(authMiddle, contPost.getPostId);
    router.route('/post/:postId').delete(authMiddle, contPost.removePostId);
    router.route('/postSearch').get(authMiddle, contPost.getPostSearch);
};
