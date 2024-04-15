
import pool from '../database/index.js'

/**
 * Procedure that queries the database and retrieves the list of registered courses
 * @param _ request not used
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const retrieveCourses = async (_, res) => {
    const dbQuery = "SELECT * FROM CRUD_COURSES.COURSE"
    let databaseResult;
    try {
        databaseResult = await pool.query(
            dbQuery
        )
    }catch (e) {
        res.status(500).send("Error interno del servidor")
        return
    }

    const formattedOutput = databaseResult[0].map(value => {
        return {
            id: value.COURSE_ID,
            facultyId: value.FACULTY_ID,
            courseNumber: value.COURSE_CODE,
            professor: value.PROFESSOR_FULL_NAME,
            credits: value.CREDITS,
            courseName: value.COURSE_NAME
        }
    })

    res.status(200).send(formattedOutput)
}

/**
 * Procedure that queries the database and retrieves the detail of a given course with their enrolled students
 * @param req request object, contains the parameter id
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const retrieveCourseDetail = async (req, res) => {
    const courseId = req.params.id

    const dbQueryCourseDetail = "SELECT * FROM CRUD_COURSES.COURSE WHERE COURSE_ID = ?"
    let courseDetailDatabaseResult;
    try {
        courseDetailDatabaseResult = await pool.query(
            dbQueryCourseDetail,
            [courseId]
        )
    }catch (e) {
        res.status(500).send("Error interno del servidor")
        return
    }


    if(courseDetailDatabaseResult[0].length === 0){
        res.status(404).send("El curso solicitado no existe")
        return
    }

    const formattedCourse = {
        id: courseDetailDatabaseResult[0][0].COURSE_ID,
        facultyId: courseDetailDatabaseResult[0][0].FACULTY_ID,
        courseNumber: courseDetailDatabaseResult[0][0].COURSE_CODE,
        professor: courseDetailDatabaseResult[0][0].PROFESSOR_FULL_NAME,
        credits: courseDetailDatabaseResult[0][0].CREDITS,
        courseName: courseDetailDatabaseResult[0][0].COURSE_NAME
    }

    const dbQueryCourseStudents = "SELECT * FROM CRUD_COURSES.COURSE_STUDENT CS INNER JOIN CRUD_COURSES.STUDENT S ON CS.STUDENT_ID = S.STUDENT_ID  WHERE CS.COURSE_ID = ?"
    const courseStudentsDatabaseResult = await pool.query(
        dbQueryCourseStudents,
        [courseId]
    )

    formattedCourse.studens = courseStudentsDatabaseResult[0].map(value => {
        return  {
            id: value.STUDENT_ID,
            name: value.NAME,
            lastName: value.LAST_NAME,
            studentId: value.STUDENT_ID_NUMBER,
            email: value.EMAIL
        }
    })

    res.status(200).send(formattedCourse)
}

/**
 * Procedure that inserts into the database the data associated with a new course, returns error if already registered
 * @param req request object, contains the body where the course data is found
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const addCourse = async (req, res) => {
    const courseData = req.body

    const dbQuery = "INSERT INTO CRUD_COURSES.COURSE(FACULTY_ID, COURSE_CODE, PROFESSOR_FULL_NAME, CLASSROOM_NUMBER, CREDITS, COURSE_NAME) VALUES (?,?,?,?,?,?)"
    try {
        await pool.query(
            dbQuery,
            [
                courseData.facultyId,
                courseData.courseCode,
                courseData.professor,
                courseData.classroom,
                courseData.credits,
                courseData.courseName
            ]
        )

        res.sendStatus(200);
    }catch (e) {
        res.status(422).send("La combinación del código de la escuela y el identificador de curso ya se encuentra registrada")
    }
}

/**
 * Procedure that queries the elimination of a course to the database, if record doesn't exist sends error message
 * @param req request object, contains the parameter id
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const deleteCourse = async (req, res) => {
    const id = req.params.id;

    const dbQuery = "DELETE FROM CRUD_COURSES.COURSE C WHERE C.COURSE_ID = ?"
    let databaseResult;
    try {
        databaseResult = await pool.query(
            dbQuery,
            [id]
        )
    }catch (e) {
        res.status(409).send("El curso a eliminar tiene estudiantes asociados por lo que no es posible eliminarlo")
        return
    }

    if(databaseResult[0].affectedRows === 0){
        res.status(404).send("El curso a eliminar no existe")
    }else{
        res.status(200).send("Curso eliminado con exito")
    }
}

/**
 * Procedure that queries an update to the database to change a course data
 * @param req request object, contains the parameter id and in the body the new course data
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const updateCourse = async (req, res) => {
    const courseModifiedData = req.body
    const id = req.params.id

    const dbQuery = "UPDATE CRUD_COURSES.COURSE C SET FACULTY_ID=?, COURSE_CODE=?, PROFESSOR_FULL_NAME=?, CLASSROOM_NUMBER=?, CREDITS=?, COURSE_NAME=? WHERE C.COURSE_ID = ?"
    let databaseResult;
    try {
        databaseResult =await pool.query(
            dbQuery,
            [
                courseModifiedData.facultyId,
                courseModifiedData.courseCode,
                courseModifiedData.professor,
                courseModifiedData.classroom,
                courseModifiedData.credits,
                courseModifiedData.courseName,
                id
            ]
        )
    }catch (e) {
        res.status(422).send("La combinación del código de la escuela y el identificador de curso ya se encuentra registrada")
        return
    }

    if(databaseResult[0].affectedRows === 0){
        res.status(404).send("El curso a modificar no existe")
    }else{
        res.status(200).send("Curso modificado con exito")
    }
}

/**
 * Procedure that queries an insert to the database to add a student enrollment to a course
 * @param req request object, contains the parameters courseId and studentId
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const enrollStudent = async (req, res) => {
    const {courseId, studentId} = req.params

    const dbQuery = "INSERT INTO CRUD_COURSES.COURSE_STUDENT(STUDENT_ID, COURSE_ID) VALUES (?, ?)"
    try {
        await pool.query(
            dbQuery,
            [
                studentId,
                courseId
            ]
        )

        res.sendStatus(200);
    }catch (e) {
        res.status(404).send("El curso o el estudiante a matricular no existe")
    }
}

/**
 * Procedure that queries an enrollment delete to the database
 * @param req request object, contains the parameters courseId and studentId
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const deleteStudentEnrollment = async (req, res) => {
    const {courseId, studentId} = req.params

    const dbQuery = "DELETE FROM CRUD_COURSES.COURSE_STUDENT CS WHERE CS.STUDENT_ID = ? AND CS.COURSE_ID = ?"
    let databaseResult;
    try {
        databaseResult = await pool.query(
            dbQuery,
            [
                studentId,
                courseId
            ]
        )
    }catch (e) {
        res.status(500).send("Error interno del servidor")
        return
    }

    if(databaseResult[0].affectedRows === 0){
        res.status(404).send("La matricula a eliminar no existe")
    }else{
        res.status(200).send("Matricula eliminada con exito")
    }
}

export {
    retrieveCourses,
    retrieveCourseDetail,
    deleteCourse,
    addCourse,
    updateCourse,
    enrollStudent,
    deleteStudentEnrollment
}

