// Data provider for Confirm Email field validation tests
export const confirmEmailInput = {
  invalidBoth: {
    email: "test@test.",
    confirmEmail: "test@test.",
    testDescription:
      "Fill in invalid email and invalid confirm email - Expect enter a valid email address, class error and disabled button",
    errorMessage: "Please enter a valid email address",
    errorField: "email",
  },
  mismatch: {
    email: "test@test.net",
    confirmEmail: "test@testa.net",
    testDescription:
      "Fill in valid email and different confirm email - Expect emails do not match, class error and disabled button",
    errorMessage: "Emails do not match",
    errorField: "confirmEmail",
  },
  emptyBoth: {
    email: "                  ",
    confirmEmail: "                  ",
    testDescription:
      "Fill in empty spaces for email and confirm email - Expect error class, and disabled confirm button",
    errorMessage: "Email is required",
    errorField: "email",
  },
};
