const servicePost = require('../services/post');
//const postExistsException = require('../exceptions/authentication');

exports.createPost = async (req, res) => {
    const post = await servicePost.createOnePost(req.body, req.user);
    if (!post) {
        res.status(500).send({ error: 'post could not be created' });
    }
    res.status(201).send(post);
};

exports.getAllPosts = async (req, res) => {
    const allPost = await servicePost.bringAllPosts(req.user);
    res.status(201).send(allPost);
};

exports.getPostId = async (req, res) => {
    let infoPostId = await (
        await servicePost.getPostToId(req.params.postId)
    ).toJSON();
    res.status(201).send(infoPostId);
};

exports.removePostId = async (req, res) => {
    let infoPostRemove = await servicePost.removePostToId(
        req.params.postId,
        req.user
    );
    res.status(201).send(infoPostRemove);
};

exports.getPostSearch = async (req, res) => {
    let infoPostSearch = await servicePost.PostSearch(req.query, req.user);
    res.status(201).send(infoPostSearch);
};
