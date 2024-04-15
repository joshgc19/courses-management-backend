import {body, param} from "express-validator";

import {checkValidation} from "../util/common.js";
import {deleteStudent} from "../controllers/students_controllers.js";


/**
 * Function that returns the validator chains of a desired function
 * @param procedure name of the function to validate
 * @return list of validator chains
 */
const choseValidationChain = (procedure) => {
    switch (procedure) {
        case 'retrieveStudentDetail': {
            return [
                param('id', 'Debe indicar el identificador del estudiante a consultar').isInt().notEmpty(),
           ]
        }
        case 'addStudent': {
            return [
                body('studentId', 'Ingrese un carné númerico de 10 caracteres').notEmpty().isLength({min:10, max:10}),
                body('name', 'Ingrese el nombre del estudiante').notEmpty().isLength({max:64}),
                body('lastName', 'Ingrese los apellidos del estudiante').notEmpty().isLength({max:128}),
                body('email', 'Ingrese el correo institucional del estudiante').notEmpty().isLength({max:128}).isEmail(),
            ]
        }
        case 'deleteStudent': {
            return [
                param('id', 'Debe indicar el identificador del estudiante a eliminar').isInt().notEmpty(),
            ]
        }
        case 'updateStudent': {
            return [
                param('id', 'Debe indicar el identificador del estudiante a modificar').isInt().notEmpty(),
                body('studentId', 'Ingrese un carné númerico de 10 caracteres').notEmpty().isLength({min:10, max:10}),
                body('name', 'Ingrese el nombre del estudiante').notEmpty().isLength({max:64}),
                body('lastName', 'Ingrese los apellidos del estudiante').notEmpty().isLength({max:128}),
                body('email', 'Ingrese el correo institucional del estudiante').notEmpty().isLength({max:128}).isEmail(),
            ]
        }
  }
}

/**
 * Function that returns the validator chains needed and the handler that formats error if any
 * @param procedure name of the function to validate
 * @return list of validator chains
 */
const validate = (procedure) => {
    return [
        ...choseValidationChain(procedure),
        checkValidation
    ]
}

export default validate;