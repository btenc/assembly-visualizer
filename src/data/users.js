import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../modules/utils/validations.js";

let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
  },
  async getUserById(id) {
    id = validation.checkId(id);
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!user) throw "Error: User not found";
    return user;
  },
  async addUser(username, password, dateRegistered, snippetId, friendId) {
    username = validation.checkStr(username);
    password = validation.checkStr(password);
    // Need Validation for Date
    snippetId.forEach((sub_id) => validation.checkId(sub_id));
    friendId.forEach((sub_id) => validation.checkId(sub_id));

    let newUser = {
      username: username,
      password: password,
      dateRegistered: dateRegistered,
      snippetId: snippetId,
      friendId: friendId,
    };
    const userCollection = await users();
    const newInsertInformation = await userCollection.insertOne(newUser);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    return await this.getUserById(newInsertInformation.insertedId.toString());
  },
  async removeUser(id) {
    id = validation.checkId(id);
    const userCollection = await users();
    const deletionInfo = await userCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    if (!deletionInfo) throw `Error: Could not delete user with id of ${id}`;

    return { ...deletionInfo, deleted: true };
  },
  async updateUserPut(
    id,
    username,
    password,
    dateRegistered,
    snippetId,
    friendId
  ) {
    id = validation.checkId(id);
    username = validation.checkStr(username);
    password = validation.checkStr(password);
    // Need Validation for Date
    snippetId.forEach((sub_id) => validation.checkId(sub_id));
    friendId.forEach((sub_id) => validation.checkId(sub_id));

    const userUpdateInfo = {
      username: username,
      password: password,
      dateRegistered: dateRegistered,
      snippetId: snippetId,
      friendId: friendId,
    };
    const userCollection = await users();
    const updateInfo = await userCollection.findOneAndReplace(
      { _id: new ObjectId(id) },
      userUpdateInfo,
      { returnDocument: "after" }
    );
    if (!updateInfo)
      throw `Error: Update failed, could not find a user with id of ${id}`;

    return updateInfo;
  },
};

export default exportedMethods;
