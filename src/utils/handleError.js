
const handleHttpError = (res, message, code = 403) => {
    res.status(code)
    res.send(message)
}

module.exports = {
    handleHttpError
}