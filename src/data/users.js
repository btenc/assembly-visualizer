import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import validation from "../modules/utils/validations.js";
//Test Push
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
  async addUser(
    email,
    username,
    password,
    dateRegistered,
    snippetId,
    friendId
  ) {
    email = validation.checkEmail(email);
    username = validation.checkStr(username);
    password = validation.checkStr(password);
    dateRegistered = validation.checkDate(dateRegistered);
    snippetId.forEach((sub_id) => validation.checkId(sub_id));
    friendId.forEach((sub_id) => validation.checkId(sub_id));

    let newUser = {
      email: email,
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
  async getUserByUsername(username) {
    username = validation.checkStr(username);
    const userCollection = await users();
    const user = await userCollection.findOne({ username: username });
    if (!user) throw "Error: User not found";
    return user;
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
  async updateUserPut(id, email, username, password, snippetId, friendId) {
    id = validation.checkId(id);
    email = validation.checkEmail(email);
    username = validation.checkStr(username);
    password = validation.checkStr(password);
    snippetId = validation.checkArray(snippetId);
    snippetId.forEach((sub_id) => validation.checkId(sub_id));
    friendId = validation.checkArray(friendId);
    friendId.forEach((sub_id) => validation.checkId(sub_id));

    const userUpdateInfo = {
      email: email,
      username: username,
      password: password,
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

  async updateUsername(id, username) {
    id = validation.checkId(id);
    username = validation.checkStr(username);

    const userCollection = await users();
    const updateInfo = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { username: username } },
      { returnDocument: "after" }
    );

    if (!updateInfo.value) throw "Error: Could not update username";

    return updateInfo.value;
  },

  async updatePassword(id, password) {
    id = validation.checkId(id);
    password = validation.checkStr(password);

    const userCollection = await users();
    const updateInfo = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { password: password } },
      { returnDocument: "after" }
    );

    if (!updateInfo.value) throw "Error: Could not update password";

    return updateInfo.value;
  },
};

export default exportedMethods;
