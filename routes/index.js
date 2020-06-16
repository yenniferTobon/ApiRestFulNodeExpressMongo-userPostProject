const userAll = require('./apis/user');
const postAll = require('./apis/post');

module.exports = (router) => {
    userAll(router);
    postAll(router);
};
