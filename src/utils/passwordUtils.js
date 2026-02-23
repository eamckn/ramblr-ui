const DIGITS = "1234567890";
const SPECIALCHARS = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

const hasNumbers = (password) => {
  let numCount = 0;
  for (const char of password) {
    if (DIGITS.includes(char)) {
      numCount++;
    }
  }
  if (numCount >= 3) {
    return true;
  } else return false;
};

const hasSpecialChar = (password) => {
  for (const char of password) {
    if (SPECIALCHARS.includes(char)) {
      return true;
    }
  }
  return false;
};

const hasUpperCase = (password) => {
  for (const char of password) {
    if (/^[a-zA-Z]$/.test(char) && char === char.toUpperCase()) {
      return true;
    }
  }
  return false;
};

const hasMinLength = (password) => {
  if (password.length >= 8) {
    return true;
  } else return false;
};

const getPasswordErrors = (password) => {
  let currentPasswordErrors = [];
  if (!hasNumbers(password)) {
    currentPasswordErrors.push("Your password must contain at least 3 numbers");
  }
  if (!hasSpecialChar(password)) {
    currentPasswordErrors.push(
      "Your password must contain at least 1 special character"
    );
  }
  if (!hasUpperCase(password)) {
    currentPasswordErrors.push(
      "Your password must contain at least 1 uppercase letter"
    );
  }
  if (!hasMinLength(password)) {
    currentPasswordErrors.push(
      "Your password must be at least 8 characters long"
    );
  }
  return currentPasswordErrors;
};

export default getPasswordErrors;
