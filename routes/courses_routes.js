import validate from '../validation/courses_validation.js';
import {
    addCourse, deleteCourse, deleteStudentEnrollment,
    enrollStudent,
    retrieveCourseDetail,
    retrieveCourses,
    updateCourse
} from "../controllers/courses_controllers.js";

import express from 'express';

const router = express.Router();

// const router = require('express').Router();

/**
 * GET ROUTES
 */
router.get(
    '/',
    retrieveCourses
)

router.get(
    '/detail/:id',
    validate('retrieveCourseDetail'),
    retrieveCourseDetail
)

/**
 * PUT ROUTES
 */
router.put(
    '/:id',
    validate('updateCourse'),
    updateCourse
)
router.put(
    '/enroll/:courseId/student/:studentId',
    validate('enrollStudent'),
    enrollStudent
)

/**
 * POST ROUTES
 */
router.post(
    '/',
    validate('addCourse'),
    addCourse
);

/**
 * DELETE ROUTES
 */

router.delete(
    '/:id',
    validate('deleteCourse'),
    deleteCourse
);

router.delete(
    '/enroll/:courseId/student/:studentId',
    validate('deleteStudentEnrollment'),
    deleteStudentEnrollment
)

export default router;