import snipMethods from '../data/snippets.js';
import userMethods from "../data/users.js";

const snips = await snipMethods.getAllSnippets();
const users = await userMethods.getAllUsers();

console.log('All Snippets:')
console.log(snips);

console.log('-----------------------------------------------\nAll Users:')
console.log(users);