class errorMiddleware extends Error {
	constructor(msg, name, status) {
		super("Error, " + msg);
		this.name = name;
		this.status = status;
	}
}

module.exports = errorMiddleware;