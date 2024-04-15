import {validationResult} from "express-validator";

/**
 * Procedure that checks if there were errors earlier in the call chain and sends them to the caller
 * @param req request object where the data passed from the called is stored
 * @param res response object used to answer API call
 * @param next function used to continue the call chain
 */
const checkValidation = (req, res, next) => {
    const result= validationResult(req).array();
    if(result.length !== 0){
        res.status(401).send(result[0].msg)
    }else{
        next();
    }
}

export {
    checkValidation
}