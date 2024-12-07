import { snippets } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../modules/utils/validations.js";

let exportedMethods = {
  async getAllSnippets() {
    const snippetCollection = await snippets();
    const snippetList = await snippetCollection.find({}).toArray();
    return snippetList;
  },

  async getSnippetById(id) {
    id = validation.checkId(id);
    const snippetCollection = await snippets();
    const snippet = await snippetCollection.findOne({ _id: new ObjectId(id) });
    if (!snippet) throw "Error: Snippet not found";
    return snippet;
  },

  async addSnippet(snipName, snipBody, userId, dateCreation, dateLastEdit) {
    snipName = validation.checkStr(snipName);
    snipBody = validation.checkArray(snipBody);
    snipBody.forEach((line) => validation.checkStr(line));
    userId = validation.checkId(userId);
    dateCreation = validation.checkDate(dateCreation);
    dateLastEdit = validation.checkDate(dateLastEdit);

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
    return await this.getSnippetById(insertInfo.insertedId.toString());
  },

  async removeSnippet(id) {
    id = validation.checkId(id);
    const snippetCollection = await snippets();
    const deletionInfo = await snippetCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (!deletionInfo.value) throw "Error: Could not delete snippet";
    return { ...deletionInfo.value, deleted: true };
  },

  async updateSnippet(id, snipName, snipBody, dateLastEdit) {
    id = validation.checkId(id);
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

    if (!updateInfo.value) throw "Error: Update failed";
    return updateInfo.value;
  },

  async getSnippetsByUser(userId) {
    userId = validation.checkId(userId);
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
