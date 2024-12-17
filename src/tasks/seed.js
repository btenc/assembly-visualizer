// seed file
import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { users, snippets } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

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
    _id: new ObjectId("6760a2b457d9dca44d336348"),
    email: "admin@example.com",
    username: "admin",
    password: hashedAdminPassword,
    dateRegistered: "12/10/2024",
    snippetId: [new ObjectId("6760b290ab709b2409b3ed25")],
  },
  {
    _id: new ObjectId("6760a2b457d9dca44d336349"),
    email: "user1@example.com",
    username: "user1",
    password: hashedUserPassword,
    dateRegistered: "12/11/2024",
    snippetId: [],
  },
  {
    _id: new ObjectId("6760a2b457d9dca44d33634a"),
    email: "user2@example.com",
    username: "user2",
    password: hashedUserPassword,
    dateRegistered: "12/12/2024",
    snippetId: [],
  },
  {
    _id: new ObjectId("6760a2b457d9dca44d33634b"),
    email: "user3@example.com",
    username: "user3",
    password: hashedUserPassword,
    dateRegistered: "12/13/2024",
    snippetId: [],
  },
];

const snippetSeedData = [
  {
    _id: new ObjectId("6760b290ab709b2409b3ed25"),
    snipName: "Pythagorean Theorem ASM",
    snipBody: [
      "MOV R1, 3",
      "MUL R1, R1",
      "MOV R2, 4",
      "MUL R2, R2",
      "ADD R1, R2",
      "MOV R0, R1",
      "HLT",
    ],
    userId: new ObjectId("6760a2b457d9dca44d336348"),
    dateCreation: "12/10/2024",
    dateLastEdit: "12/13/2024",
  },
  {
    _id: new ObjectId("6760b290ab709b2409b3ed27"),
    snipName: "Simple Division with Remainder",
    snipBody: ["MOV R1, 13", "MOV R2, 4", "DIV R1, R2", "HLT"],
    userId: new ObjectId("6760a2b457d9dca44d33634a"),
    dateCreation: "12/12/2024",
    dateLastEdit: "12/13/2024",
  },
  {
    _id: new ObjectId("6760b290ab709b2409b3ed28"),
    snipName: "Logical Operations Example",
    snipBody: [
      "MOV R1, 10",
      "MOV R2, 5",
      "AND R1, R2",
      "OR R1, R2",
      "XOR R1, R2",
      "NOT R1",
      "HLT",
    ],
    userId: new ObjectId("6760a2b457d9dca44d33634b"),
    dateCreation: "12/13/2024",
    dateLastEdit: "12/14/2024",
  },
  {
    _id: new ObjectId("6760b290ab709b2409b3ed29"),
    snipName: "Fibonacci Sequence",
    snipBody: [
      "MOV R1, 0",
      "MOV R2, 1",
      "MOV R3, 10",
      "MOV R0, R1",
      "MOV R0, R2",
      "DEC R3",
      "DEC R3",
      "MOV R4, R1",
      "ADD R4, R2",
      "MOV R0, R4",
      "MOV R1, R2",
      "MOV R2, R4",
      "DEC R3",
      "JNZ R3, 1",
      "HLT",
    ],
    userId: new ObjectId("6760a2b457d9dca44d336348"),
    dateCreation: "12/13/2024",
    dateLastEdit: "12/14/2024",
  },
  {
    _id: new ObjectId("6760b290ab709b2409b3ed31"),
    snipName: "Prime Number Check",
    snipBody: [
      "MOV R1, 29",
      "MOV R2, 2",
      "MOV R3, 1",
      "MOV R4, R1",
      "MOD R4, R2",
      "JZ R4, 10",
      "INC R2",
      "JLT R2, R1, 1",
      "JMP 13",
      "MOV R3, 0",
      "JMP 13",
      "MOV R0, R3",
      "HLT",
    ],
    userId: new ObjectId("6760a2b457d9dca44d33634a"),
    dateCreation: "12/15/2024",
    dateLastEdit: "12/16/2024",
  },
  {
    _id: new ObjectId("6760b290ab709b2409b3ed32"),
    snipName: "Power Calculation",
    snipBody: [
      "MOV R1, 2",
      "MOV R2, 3",
      "MOV R3, 1",
      "JZ R2, 9",
      "MUL R3, R1",
      "DEC R2",
      "JNZ R2, 4",
      "MOV R0, R3",
      "HLT",
    ],
    userId: new ObjectId("6760a2b457d9dca44d336348"),
    dateCreation: "12/16/2024",
    dateLastEdit: "12/16/2024",
  },
  {
    _id: new ObjectId("6760b290ab709b2409b3ed33"),
    snipName: "Maximum of Three Numbers",
    snipBody: [
      "MOV R1, 15",
      "MOV R2, 27",
      "MOV R3, 9",
      "MOV R4, R1",
      "JGT R2, R4, 10",
      "MOV R4, R2",
      "JGT R3, R4, 12",
      "MOV R4, R3",
      "MOV R0, R4",
      "HLT",
      "MOV R0, R4",
      "HLT",
    ],
    userId: new ObjectId("6760a2b457d9dca44d336349"),
    dateCreation: "12/16/2024",
    dateLastEdit: "12/16/2024",
  },
  {
    _id: new ObjectId("6760b290ab709b2409b3ed34"),
    snipName: "Number Reversal",
    snipBody: [
      "MOV R1, 1234",
      "MOV R2, 0",
      "MOV R3, 10",
      "JZ R1, 10",
      "MOD R4, R3",
      "MUL R2, R3",
      "ADD R2, R4",
      "DIV R1, R3",
      "JMP 1",
      "MOV R0, R2",
      "HLT",
    ],
    userId: new ObjectId("6760a2b457d9dca44d33634a"),
    dateCreation: "12/16/2024",
    dateLastEdit: "12/16/2024",
  },
  {
    _id: new ObjectId("6760b290ab709b2409b3ed35"),
    snipName: "Caesar Cipher Encryption",
    snipBody: ["MOV R1, 65", "MOV R2, 3", "ADD R1, R2", "MOV R0, R1", "HLT"],
    userId: new ObjectId("6760a2b457d9dca44d33634b"),
    dateCreation: "12/16/2024",
    dateLastEdit: "12/16/2024",
  },
];

await userCollection.insertMany(userSeedData);
await snippetCollection.insertMany(snippetSeedData);

console.log("Users and Snippets seeded!");

await closeConnection();
