module.exports = errorHandler;
function errorHandler(err, req, res, next) {
	const status = err.status;

	if (
		err.name === "usernameNotAvailable" ||
		err.name === "usernameNotExist" ||
		err.name === "invalidPassword" ||
		err.name === "requiredField" ||
		err.name === "notAuthentication" ||
		err.name === "bookExistsException"
	) {
		return res.status(status).send({
			status: status,
			message: err.message
		});
	}
	return res.status(500).send({
		status: 500,
		message: "Se ha presentado un error en la aplicación"
	});
}