class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = (err, res) => {
  //Handle error for getALLAttendances
  if (err.command && err.command.includes("[TCP] undefined")) {
    return res.json([]);
  }
  let { statusCode = 500, message = "Server error", kind } = err;
  if (kind === "ObjectId") {
    statusCode = 404;
    message = "Not found";
  }
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
module.exports = {
  ErrorHandler,
  handleError,
};
