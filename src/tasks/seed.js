// seed file
import { dbConnection, closeConnection } from '/config/mongoConnections.js'

const db = await dbConnection();
await db.dropDatabase();

console.log('Database cleared!');
await closeConnection();