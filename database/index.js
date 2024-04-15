import { createPool } from 'mysql2/promise';


/**
 * Connection pool set up
 */
const poolConnectionOptions = {
    host: process.env.REMOTE_DB_HOST,
    port: process.env.REMOTE_DB_PORT,
    user: process.env.REMOTE_DB_USER,
    database: process.env.REMOTE_DB_DATABASE,
    password: process.env.REMOTE_DB_PASSWORD,
    waitForConnections: true,
    enableKeepAlive: true,
    multipleStatements: true,
    connectionLimit: 20,
    connectTimeout: 60000
};

/**
 * Create database connection pool
 */
let pool;

try {
    pool = createPool(poolConnectionOptions);
    console.log('A new MySQL pool has been created successfully.');
} catch (err) {
    console.error(err);
}

export default pool;
