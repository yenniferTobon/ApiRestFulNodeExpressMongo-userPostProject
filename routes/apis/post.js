const contPost = require('../../controllers/post');
const authMiddle = require('../../middlewares/authentication');

module.exports = (router) => {
    router.route('/post').post(authMiddle, contPost.createPost);
    router.route('/post').get(authMiddle, contPost.getAllPosts);
    router.route('/post/:postId').get(authMiddle, contPost.getPostId);
    router.route('/post/:postId').delete(authMiddle, contPost.removePostId);
    /*router.route('/post/:libroId').get(authMiddle, contBook.getPostId);
    router.route('/post/:libroId').patch(authMiddle, contBook.patchPostId);
    router.route('/post/:libroId').delete(authMiddle, contBook.removePostId);
    router
        .route('/post/addfavorite/:libroId')
        .post(authMiddle, contBook.addFavorite);
    router
        .route('/libro/rmfavorite/:libroId')
        .post(authMiddle, contBook.deleteFavorite);*/
};
