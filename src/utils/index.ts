const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const responseBody = (message: string, data?: any) => {
  return {
    message,
    data,
  };
};
const createHash = async function (plainTextPassword: string) {
  // return password hash
  return await argon2.hash(plainTextPassword);
};
const generateID = () => {
  const timestamp = new Date().getTime().toString(); // get current timestamp as string
  const random = Math.random().toString().substr(2, 5); // generate a random string of length 5
  const userId = timestamp + random; // concatenate the timestamp and random strings
  return userId;
};
const cryptConfig = (text: string, action: boolean) => {
  const salt = process.env.ENCRYPT_KEY || "";
  return action ? crypt(salt, text) : decrypt(salt, text);
};
const crypt = (salt: string, text: string) => {
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n: string) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const decrypt = (salt: string, encoded: string) => {
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  const matched = encoded.match(/.{1,2}/g);
  if (matched) {
    return matched
      .map((hex: string) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode: any) => String.fromCharCode(charCode))
      .join("");
  } else {
    return "";
  }
};

// Method to validate the entered password using argon2
const validateHash = async function (
  hashed: string,
  candidatePassword: string
) {
  return await argon2.verify(hashed, candidatePassword);
};
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const signToken = (data: any) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  const payload = { payload: data, date: 1 };
  payload.date = Date.now();

  return jwt.sign(payload, jwtSecretKey);
};
const verifyToken = (token: string) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return verified;
    } else {
      // Access Denied
      return false;
    }
  } catch (error) {
    // Access Denied
    return false;
  }
};
const countContestants = (arr: [string: any]) => {
  const counts: any = {};
  for (let i = 0; i < arr.length; i++) {
    const contestantId = arr[i].contestantId;
    if (counts[contestantId]) {
      counts[contestantId]++;
    } else {
      counts[contestantId] = 1;
    }
  }
  return counts;
};
function isValidObject(json: any) {
  if (typeof json !== "object" || json === null || Array.isArray(json)) {
    return false;
  }

  try {
    JSON.stringify(json);
  } catch (e) {
    return false;
  }

  return true;
}

const generateOTP = () => {
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 7; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
function replacePlaceholders(templateContent: any, templateValues: any) {
  // const { templateValues, templateContent } = template;
  const placeholderRegex = /\$(\w+)/g;

  let replacedContent = templateContent.replace(placeholderRegex, (match: any, key: any) => {
    if (templateValues.hasOwnProperty(key)) {
      return templateValues[key];
    } else {
      return match; // Keep the placeholder if value not found
    }
  });

  // Check if any placeholders remain in the replaced content
  const remainingPlaceholders = replacedContent.match(placeholderRegex);
  if (remainingPlaceholders) {
    const missingValues = remainingPlaceholders.map((placeholder: any) => placeholder.slice(1));
    return {
      status: false,
      content: replacedContent,
      message: `Missing values: ${missingValues.join(", ")}`
    };
  }

  return {
    status: true,
    content: replacedContent,
    message: ""
  };
}

module.exports = {
  verifyToken,
  signToken,
  createHash,
  validateHash,
  generateID,
  generateOTP,
  countContestants,
  isValidObject,
  isValidEmail,
  responseBody,
  decrypt,
  crypt,
  cryptConfig,
  replacePlaceholders
};
