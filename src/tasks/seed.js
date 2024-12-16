// seed file
import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { users, snippets } from "../config/mongoCollections.js";
import { ObjectId } from 'mongodb';
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
    _id: new ObjectId('6760a2b457d9dca44d336348'),
    email: "admin@example.com",
    username: "admin",
    password: hashedAdminPassword,
    dateRegistered: "12/10/2024",
    snippetId: [new ObjectId('6760b290ab709b2409b3ed25')]
  },
  {
    _id: new ObjectId('6760a2b457d9dca44d336349'),
    email: "user1@example.com",
    username: "user1",
    password: hashedUserPassword,
    dateRegistered: "12/11/2024",
    snippetId: []
  },
  {
    _id: new ObjectId('6760a2b457d9dca44d33634a'),
    email: "user2@example.com",
    username: "user2",
    password: hashedUserPassword,
    dateRegistered: "12/12/2024",
    snippetId: []
  },
  {
    _id: new ObjectId('6760a2b457d9dca44d33634b'),
    email: "user3@example.com",
    username: "user3",
    password: hashedUserPassword,
    dateRegistered: "12/13/2024",
    snippetId: []
  },
];

const snippetSeedData = [
  {
    _id: new ObjectId('6760b290ab709b2409b3ed25'),
    snipName: "Pythagorean Theorem ASM",
    snipBody: [],
    userId: new ObjectId('6760a2b457d9dca44d336348'),
    dateCreation: "12/10/2024",
    dateLastEdit: "12/13/2024"
  },
];

await userCollection.insertMany(userSeedData);
await snippetCollection.insertMany(snippetSeedData);

console.log("Users and Snippets seeded!");

await closeConnection();
