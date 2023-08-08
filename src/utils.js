import { isValidPhoneNumber } from "react-phone-number-input";

const validators = {
  isValidEmail: { validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
  isNonEmptyString: {
    validate: (value) => typeof value === "string" && value.trim() !== "",
  },
  isValidPhoneNumber: { validate: (v) => isValidPhoneNumber(JSON.stringify(v)) },
};

export default validators;
