//const authentication = require("./autheRouters.js");
const userAll = require('./apis/user');
const postAll = require('./apis/post');

module.exports = (router) => {
    //authentication(router);
    userAll(router);
    postAll(router);
};
