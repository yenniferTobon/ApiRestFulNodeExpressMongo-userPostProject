const postModel = require('../models/post'),
    postService = require('./post'),
    postNotExist = require('../exceptions/errorMiddleware'),
    authorizedUser = require('../exceptions/errorMiddleware'),
    config = require('../configs/config.js'),
    images = require('./images.js');

exports.createOnePost = async (post, idUser) => {
    post.author = idUser;
    const filePath = config.pathImage + post.image;
    const fileName = filePath.split('/')[filePath.split('/').length - 1];
    const urlImageS3 = await images.cargarImagen(filePath, fileName);
    post.image = urlImageS3;
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
        throw new postNotExist('Post not found', 'postNotExist', 404);
    }

    const infoPost = await postModel.find({
        $and: [{ _id: idPost }, { author: idUser }]
    });
    if (infoPost.length === 0) {
        throw new authorizedUser('Not authorized user', 'authorizedUser', 404);
    }
    const removePostPatch = await postModel.findByIdAndRemove(idPost);
    return removePostPatch;
};

exports.PostSearch = async (queryPost, idUser) => {
    if (queryPost.search == null) {
        const infoAllPost = await postModel
            .find({ author: idUser })
            .populate('author');
        return infoAllPost;
    }
    const infoPost = await postModel.find({
        $or: [
            { title: { $regex: queryPost.search, $options: 'i' } },
            { content: { $regex: queryPost.search, $options: 'i' } }
        ],
        $and: [{ author: idUser }]
    });
    return infoPost;
};
