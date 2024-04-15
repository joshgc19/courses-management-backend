import 'dotenv/config.js';

import express from "express";
import cors from "cors";
import bodyParser from "express";

import coursesRouter from "./routes/courses_routes.js";
import studentsRouter from "./routes/students_routes.js";


/**
 * Import environmental variables
 */
const { API_PORT } = process.env;



/**
 * Create Express server
 */
const app = express();

/**
 * Express configuration
 */
app.set('port', API_PORT);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

/**
 * App routes
 */
app.use('/courses', coursesRouter);
app.use("/students", studentsRouter)

/**
 * Server's general information
 */
const serverInfo = `
    =======================================
    DOP Integrated Information System Backend Server is running
    Version: v1.0.0
    Port: ${API_PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    =======================================
    
    Press Ctrl+C to stop server.
`;

/**
 * Start server
 */
const server = app.listen(app.get('port'), () => {
    console.log(serverInfo);
});

export default server;
