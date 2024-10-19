function errorHandler(error, req, res, next) {
    let status = error.status || 500
    let message = error.message || "Internal error server"
console.log( error.message,error.name, error.status, "<<<<<<<<<<<<<<<error handler");
    switch (error.name) {
        case "SequelizeUniqueConstraintError":
        case "SequelizeValidationError":
            status = 400
            break
        case "Invalid input":
            status = 400
            message = "email/password is require"
            break
        case "Invalid User":
            status = 401
            message = "Invalid email/password"
            break
        case "invalid token":
        case "JsonWebTokenError":
            status = 403
            message = "Acces denied"
            break
        case "Menu 404":
            status = 404
            message = "Data Menu Not Found"
            break;
        case "User 404":
            status = 404
            message = "Data User Not Found"
            break;
    }
    res.status(status).json({message})
}

module.exports = errorHandler