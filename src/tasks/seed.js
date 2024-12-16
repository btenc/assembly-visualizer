// seed file
import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { users, snippets } from "../config/mongoCollections.js";
import bcrypt from 'bcryptjs';

const db = await dbConnection();
await db.dropDatabase();

console.log("Database cleared!");

const userCollection = await users();
const snippetCollection = await snippets();

// Seed users
const hashedAdminPassword = await bcrypt.hash("Admin123!", 10);
const hashedUserPassword = await bcrypt.hash("Password123!", 10);

const userSeedData = [
  {
    email: "admin@example.com",
    username: "admin",
    password: hashedAdminPassword,
    dateRegistered: "12/10/2024"
  },
  {
    email: "user1@example.com",
    username: "user1",
    password: hashedUserPassword,
    dateRegistered: "12/11/2024"
  },
  {
    email: "user2@example.com",
    username: "user2",
    password: hashedUserPassword,
    dateRegistered: "12/12/2024"
  },
  {
    email: "user3@example.com",
    username: "user3",
    password: hashedUserPassword,
    dateRegistered: "12/13/2024"
  },
];

await userCollection.insertMany(userSeedData);
console.log("Users seeded!");

await closeConnection();
