export const invalidPasswordInput = {
  invalidPasswordEmptySpaces: {
    invalidPasswordValue: "         ",
    testDescription:
      "Fill in invalid password empty spaces - Expect must contain capital letter, class error and disabled confirm button",
    errorMessage: "Password must contain at least one capital letter",
  },
  invalidPasswordTooShort: {
    invalidPasswordValue: "T3stt",
    testDescription:
      "Fill in invalid password too short - Expect password must be between 6 and 20 characters, class error and disabled confirm button",
    errorMessage: "Password must be between 6 and 20 characters",
  },
  invalidPasswordNoUppercase: {
    invalidPasswordValue: "t3sting",
    testDescription:
      "Fill in invalid password no uppercase - Expect must contain capital letter, class error and disabled confirm button",
    errorMessage: "Password must contain at least one capital letter",
  },
  invalidPasswordTooLong: {
    invalidPasswordValue: "T3stingT3stingT3stingT3stingT3stingT3sting",
    testDescription:
      "Fill in invalid password too long - Expect password must be between 6 and 20 characters, class error and disabled confirm button",
    errorMessage: "Password must be between 6 and 20 characters",
  },
  invalidPasswordNoDigit: {
    invalidPasswordValue: "Testing",
    testDescription:
      "Fill in invalid password no digit - Expect must contain digit, class error and disabled confirm button",
    errorMessage: "Password must contain at least one digit",
  },
};
