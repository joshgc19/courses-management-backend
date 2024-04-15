
import pool from '../database/index.js'

/**
 * Procedure that queries the list of students registered in the database
 * @param _ request object not used
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const retrieveStudents = async (_, res) => {
    const dbQuery = "SELECT * FROM CRUD_COURSES.STUDENT"
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
            id: value.STUDENT_ID,
            studentId: value.STUDENT_ID_NUMBER,
            name: value.NAME,
            lastName: value.LAST_NAME,
            email: value.EMAIL,
        }
    })

    res.status(200).send(formattedOutput)
}

/**
 * Procedure that queries the detail of a student by its id
 * @param req request object, contains the parameter id
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const retrieveStudentDetail = async (req, res) => {
    const id = req.params.id

    const dbQuery = "SELECT * FROM CRUD_COURSES.STUDENT S WHERE S.STUDENT_ID=?"
    let databaseResult;
    try {
        databaseResult = await pool.query(
            dbQuery,
            [id]
        )
    }catch (e) {
        res.status(500).send("Error interno del servidor")
        return
    }

    if(databaseResult[0].length === 0){
        res.status(404).send("El estudiante solicitado no existe")
        return
    }

    const formattedOutput = {
        id: databaseResult[0][0].STUDENT_ID,
        studentId: databaseResult[0][0].STUDENT_ID_NUMBER,
        name: databaseResult[0][0].NAME,
        lastName: databaseResult[0][0].LAST_NAME,
        email: databaseResult[0][0].EMAIL,
    }

    res.status(200).send(formattedOutput)
}

/**
 * Procedure that inserts a new student into the database
 * @param req request object, contains the body where the student data is found
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const addStudent = async (req, res) => {
    const studentData = req.body

    const dbQuery = "INSERT INTO CRUD_COURSES.STUDENT(STUDENT_ID_NUMBER, NAME, LAST_NAME, EMAIL) VALUES (?,?,?,?)"
    try {
        await pool.query(
            dbQuery,
            [
                studentData.studentId,
                studentData.name,
                studentData.lastName,
                studentData.email,
            ]
        )

        res.sendStatus(200);
    }catch (e) {
        res.status(422).send("El carné o correo institucional ya se encuentra registrado")
    }
}

/**
 * Procedure that queries and update to a specific student
 * @param req request object, contains the parameter id and in the body the new student data
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const updateStudent = async (req, res) => {
    const studentData = req.body
    const id = req.params.id

    const dbQuery = "UPDATE CRUD_COURSES.STUDENT S SET STUDENT_ID_NUMBER=?, NAME=?, LAST_NAME=?, EMAIL=? WHERE S.STUDENT_ID=?"
    let databaseResult;
    try {
        databaseResult = await pool.query(
            dbQuery,
            [
                studentData.studentId,
                studentData.name,
                studentData.lastName,
                studentData.email,
                id
            ]
        )
    }catch (e) {
        res.status(422).send("El carné o correo institucional ya se encuentra registrado")
        return
    }

    if(databaseResult[0].affectedRows === 0){
        res.status(404).send("El estudiante a modificar no existe")
    }else{
        res.status(200).send("Estudiante modificado con exito")
    }
}

/**
 * Procedure that queries the deletion of a student to the database
 * @param req request object, contains the parameter id
 * @param res response object used to answers API call
 * @return {Promise<void>} void return as the response is given via the res object
 */
const deleteStudent = async (req, res) => {
    const id = req.params.id

    const dbQuery = "DELETE FROM CRUD_COURSES.STUDENT S WHERE S.STUDENT_ID=?"
    let databaseResult;
    try {
        databaseResult = await pool.query(
            dbQuery,
            [id]
        )
    }catch (e) {
        res.status(409).send("El estudiante a eliminar tiene cursos asociados, por lo que no se puede eliminar")
        return
    }

    if(databaseResult[0].affectedRows === 0){
        res.status(404).send("El estudiante a eliminar no existe")
    }else{
        res.status(200).send("Estudiante eliminado con exito")
    }
}

export {
    retrieveStudents,
    retrieveStudentDetail,
    addStudent,
    updateStudent,
    deleteStudent
}