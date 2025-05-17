export const invalidEmailFormat = {
  invalidEmailTooLong: {
    value: "test@test1234567891234.net",
    testDescription:
      "Fill in invalid email address above max length - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Email must not exceed 25 characters",
  },
  invalidEmailEmpty: {
    value: "            ",
    testDescription:
      "Fill in invalid email address only empty spaces - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Email is required",
  },
  invalidEmailNoTld: {
    value: "test@test.",
    testDescription:
      "Fill in invalid email with no TLD - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Please enter a valid email address",
  },
  invalidEmailNoDot: {
    value: "test@test",
    testDescription:
      "Fill in invalid email with no dot in domain - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Please enter a valid email address",
  },
  invalidEmailNoAt: {
    value: "testtest.net",
    testDescription:
      "Fill in invalid email with no @ symbol - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Please enter a valid email address",
  },
  invalidEmailNoDomain: {
    value: "test@test.",
    testDescription:
      "Fill in invalid email with no domain - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Please enter a valid email address",
  },
  invalidEmailNoUser: {
    value: "@test.net",
    testDescription:
      "Fill in invalid email with no user part - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Please enter a valid email address",
  },
  invalidEmailNoUserOrDomain: {
    value: "@.net",
    testDescription:
      "Fill in invalid email with no user and no domain - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Please enter a valid email address",
  },
  invalidEmailNoUserOrTld: {
    value: "@test.",
    testDescription:
      "Fill in invalid email with no user and no TLD - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Please enter a valid email address",
  },
  invalidEmailNoUserOrDomainOrTld: {
    value: "@test",
    testDescription:
      "Fill in invalid email with no user, no domain, and no TLD - Expect validation email error, error class and confirm button to be disabled",
    errorMessage: "Please enter a valid email address",
  },
};
