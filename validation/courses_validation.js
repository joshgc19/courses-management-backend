import {body, param} from "express-validator";

import {checkValidation} from "../util/common.js";

/**
 * Function that returns the validator chains of a desired function
 * @param procedure name of the function to validate
 * @return list of validator chains
 */
const choseValidationChain = (procedure) => {
    switch (procedure) {
        case 'retrieveCourseDetail': {
            return [
                param('id', 'Debe indicar el codigo del curso a consultar').isInt().notEmpty(),
           ]
        }
        case 'addCourse': {
            return [
                body('facultyId', 'Ingrese un código de la escuela mayor o igual a 2 caracteres').notEmpty().isLength({min:2}),
                body('courseCode', 'Ingrese el codigo del curso').notEmpty().isLength({max:8}),
                body('professor', 'Ingrese el nombre del profesor que imparte el curso').notEmpty().isLength({max:128}),
                body('classroom', 'Ingrese la clase en la que se imparte el curso').notEmpty().isLength({max:16}),
                body('credits', 'Seleccione la cantidad de créditos que tiene el curso').notEmpty(),
                body('courseName', 'Ingrese un nombre curso menor a 64 caracteres').notEmpty().isLength({max:64}),
            ]
        }
        case 'deleteCourse': {
            return [
                param('id', 'Debe indicar el codigo del curso a eliminar').isInt().notEmpty(),
            ]
        }
        case 'updateCourse': {
            return [
                param('id', 'Debe indicar el codigo del curso a modificar').isInt().notEmpty(),
                body('facultyId', 'Ingrese un código de la escuela mayor o igual a 2 caracteres').notEmpty().isLength({min:2}),
                body('courseCode', 'Ingrese el codigo del curso').notEmpty().isLength({max:8}),
                body('professor', 'Ingrese el nombre del profesor que imparte el curso').notEmpty().isLength({max:128}),
                body('classroom', 'Ingrese la clase en la que se imparte el curso').notEmpty().isLength({max:16}),
                body('credits', 'Seleccione la cantidad de créditos que tiene el curso').notEmpty(),
                body('courseName', 'Ingrese un nombre curso menor a 64 caracteres').notEmpty().isLength({max:64}),
            ]
        }
        case 'enrollStudent': {
            return [
                param('courseId', 'Debe indicar el codigo del curso a matricular').isInt().notEmpty(),
                param('studentId', 'Debe indicar el codigo del estudiante a matricular').isInt().notEmpty(),
            ]
        }
        case 'deleteStudentEnrollment': {
            return [
                param('courseId', 'Debe indicar el codigo del curso a desmatricular').isInt().notEmpty(),
                param('studentId', 'Debe indicar el codigo del estudiante a desmatricular').isInt().notEmpty(),
            ]
        }
        default: {
            return []
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