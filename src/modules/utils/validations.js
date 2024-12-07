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

  checkINT(num) {
    if (num === undefined || num === null) {
      throw `Error: You must supply a number!`;
    }

    if (typeof num !== "number" || isNaN(num)) {
      throw "Error: must be a number!";
    }

    if (!Number.isInteger(num)) {
      throw "Error: Not an integer!";
    }
    return num;
  },

  checkNum(num) {
    if (num === undefined || num === null) {
      throw `Error: You must supply a number!`;
    }

    if (typeof num !== "number" || isNaN(num)) {
      throw "Error: must be a number!";
    }

    return num;
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

  checkDate(dateStr) {
    if (!dateStr) {
      throw "Error: You must provide a date";
    }

    if (typeof dateStr !== "string") {
      throw "Error: Date should be a string";
    }

    dateStr = dateStr.trim();
    if (dateStr.length === 0) {
      throw "Error: Date cannot be an empty string or string with just spaces";
    }

    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    if (!dateRegex.test(dateStr)) {
      throw "Error: Date must be in the format MM/DD/YYYY";
    }

    return dateStr;
  },
};

export default exportedMethods;
