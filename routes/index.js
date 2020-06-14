//const authentication = require("./autheRouters.js");
const userAll = require("./apis/user");
//const libroAll = require("./bookRouters");

module.exports = router => {
	//authentication(router);
	userAll(router);
	//libroAll(router);
};