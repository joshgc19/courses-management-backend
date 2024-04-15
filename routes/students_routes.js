import validate from '../validation/students_validation.js';
import {
    retrieveStudents,
    retrieveStudentDetail,
    updateStudent,
    addStudent,
    deleteStudent
} from "../controllers/students_controllers.js";

import express from 'express';

const router = express.Router();

/**
 * GET ROUTES
 */
router.get(
    '/',
    retrieveStudents
)

router.get(
    '/detail/:id',
    validate('retrieveStudentDetail'),
    retrieveStudentDetail
)

/**
 * PUT ROUTES
 */
router.put(
    '/:id',
    validate('updateStudent'),
    updateStudent
)

/**
 * POST ROUTES
 */
router.post(
    '/',
    validate('addStudent'),
    addStudent
);


/**
 * DELETE ROUTES
 */
router.delete(
    '/:id',
    validate('deleteStudent'),
    deleteStudent
)



export default router;