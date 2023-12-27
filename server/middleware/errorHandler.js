const {constants} = require("../constants")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; 
    switch (statusCode) {
        case constants.FORBIDDEN:
            res.json({ 
                title: "Forbidden", 
                message: err.message, 
                stackTrace: err.stack 
            })
            break;

        case constants.VALIDATION_ERROR : 
        res.json({ 
            title: "Validarion error", 
            message: err.message, 
            stackTrace: err.stack 
        })

        case constants.UNAUTHROZIED : 
        res.json({ 
            title: "Auth failed", 
            message: err.message, 
            stackTrace: err.stack 
        }); 

        case constants.NOT_FOUND : 
        res.json({ 
            title: "Not Found", 
            message: err.message, 
            stackTrace: err.stack 
        }); 

        case constants.SERVER_ERROR : 
        res.json({ 
            title: "Sever Error", 
            message: err.message, 
            stackTrace: err.stack 
        })


        default:
            console.log("No error")
            break;
    }
};

module.exports = errorHandler
