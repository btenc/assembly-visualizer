// Put validation functions here
import { ObjectId } from "mongodb";

const exportedMethods = {
  checkStr(strVal) {
    if (!strVal) {
      throw `Error: You must supply a string!`;
    }

    if (typeof strVal !== "string") {
      throw `Error: must be a string!`;
    }

    strVal = strVal.trim();
    if (strVal.length === 0) {
      throw `Error: cannot be an empty string or string with just spaces`;
    }

    return strVal;
  },

  checkId(id) {
    if (!id) {
      throw `Error: You must provide an id`;
    }

    if (typeof id !== "string") {
      throw `Error: id must be a string`;
    }
    id = id.trim();
    if (id.length === 0) {
      throw `Error: id cannot be an empty string or just spaces`;
    }

    if (!ObjectId.isValid(id)) {
      throw `Error: invalid object ID`;
    }
    return id;
  },
};

export default exportedMethods;
