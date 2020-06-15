const postModel = require('../models/post');
//const bookExistsException = require('../exceptions/bookExistsException');
const postService = require('./post');
const userModel = require('../models/user');
const postNotExistException = require('../exceptions/errorMiddleware');
const authorizedUserException = require('../exceptions/errorMiddleware');
//const serviceUser = require('../services/userServices');

exports.createOnePost = async (post, idUser) => {
    post.author = idUser;
    const newPost = await postModel.create(post);
    return newPost;
};

exports.bringAllPosts = async (idUser) => {
    const posts = await postModel.find({ author: idUser }).populate('author');
    return posts;
};

exports.getPostToId = async (idPost) => {
    const infoPostId = await postModel.findById(idPost).populate('author');
    return infoPostId;
};

exports.removePostToId = async (idPost, idUser) => {
    let postExist = await postService.getPostToId(idPost);
    if (!postExist) {
        throw new postNotExistException('Post not found', 'postNotExist', 404);
    }

    const infoPost = await postModel.find({
        $and: [{ _id: idPost }, { author: idUser }]
    });
    if (infoPost.length === 0) {
        throw new authorizedUserException(
            'Not authorized user',
            'authorizedUser',
            404
        );
    }
    const removePostPatch = await postModel.findByIdAndRemove(idPost);

    console.log(removePostPatch);
    return removePostPatch;
};
