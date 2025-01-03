// Put validation functions here

//THIS FILE IS PUBLICALLY SERVED, DO NOT IMPORT MONGO

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

  checkArray(arr) {
    if (!Array.isArray(arr)) {
      throw `Error: Input must be an array!`;
    }
    return arr;
  },

  checkEmail(email) {
    if (!email) {
      throw "Error: You must provide an email";
    }

    if (typeof email !== "string") {
      throw "Error: Email must be a string";
    }

    email = email.trim();
    if (email.length === 0) {
      throw "Error: Email cannot be an empty string or just spaces";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw "Error: Invalid email address";
    }

    return email;
  },
};

export default exportedMethods;
