import { createPool, Pool } from 'mysql2/promise';
import { PoolOptions } from 'mysql2';

/**
 * Connection pool set up
 */
const poolConnectionOptions: PoolOptions = {
    host: process.env.REMOTE_DB_HOST,
    port: process.env.REMOTE_DB_PORT as unknown as number,
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
let pool: Pool;

try {
    pool = createPool(poolConnectionOptions);
    console.log('A new MySQL pool has been created successfully.');
} catch (err) {
    console.error(err);
}

export default pool;
