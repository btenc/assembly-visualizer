import { snippets } from "../config/mongoCollections.js";
import { users } from "../config/mongoCollections.js";
import userFuncs from './users.js';
import { ObjectId } from "mongodb";
import validation from "../modules/utils/validations.js";
import { checkId } from "./helpers.js";

let exportedMethods = {
  async getAllSnippets() {
    const snippetCollection = await snippets();
    const snippetList = await snippetCollection.find({}).toArray();
    return snippetList;
  },

  async getSnippetById(id) {
    id = checkId(id);
    const snippetCollection = await snippets();
    const snippet = await snippetCollection.findOne({ _id: new ObjectId(id) });
    if (!snippet) throw "Error: Snippet not found";
    return snippet;
  },

  async addSnippet(snipName, snipBody, userId, dateCreation) {
    snipName = validation.checkStr(snipName);
    snipBody = validation.checkArray(snipBody);
    snipBody.forEach((line) => validation.checkStr(line));
    userId = checkId(userId);
    dateCreation = validation.checkDate(dateCreation);
    let dateLastEdit = dateCreation;

    const newSnippet = {
      snipName,
      snipBody,
      userId: new ObjectId(userId),
      dateCreation,
      dateLastEdit,
    };

    const snippetCollection = await snippets();
    const insertInfo = await snippetCollection.insertOne(newSnippet);
    if (!insertInfo.insertedId) throw "Error: Insert failed!";
    const user = await userFuncs.getUserById(userId);
    user.snippetId.push(insertInfo.insertedId);
    const userCollection = await users();
    const updateInfo = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { snippetId: user.snippetId } },
      { returnDocument: "after" }
    );
    
    return await this.getSnippetById(insertInfo.insertedId.toString());
  },

  async removeSnippet(id) {
    id = checkId(id);
    const snippetCollection = await snippets();
    const deletionInfo = await snippetCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (!deletionInfo.value) throw "Error: Could not delete snippet";
    return { ...deletionInfo.value, deleted: true };
  },

  async updateSnippet(id, snipName, snipBody, dateLastEdit) {
    id = checkId(id);
    snipName = validation.checkStr(snipName, { min: 1, max: 30 });
    snipBody = validation.checkArray(snipBody, { min: 1 });
    snipBody.forEach((line) => validation.checkStr(line));
    dateLastEdit = validation.checkDate(dateLastEdit);

    const snippetUpdateInfo = {
      snipName,
      snipBody,
      dateLastEdit,
    };

    const snippetCollection = await snippets();
    const updateInfo = await snippetCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: snippetUpdateInfo },
      { returnDocument: "after" }
    );

    if (!updateInfo) throw "Error: Update failed";
    return updateInfo.value;
  },

  async getSnippetsByUser(userId) {
    userId = checkId(userId);
    const snippetCollection = await snippets();
    const userSnippets = await snippetCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    if (!userSnippets.length)
      throw `Error: No snippets found for user with id: ${userId}`;
    return userSnippets;
  },
};

export default exportedMethods;
