export const apiRequests = {
  invalidEmailAndPasswordTooLong: {
    testDescription:
      "API call with invalid email and password that are too long - Expect 400 Bad Request and error messages",
    request: {
      email: "test@test1234567891234.net",
      confirmEmail: "test@test1234567891234.net",
      password: "T3stingT3stingT3stingT3stingT3stingT3sting",
    },
    responseStatus: 400,
    responseBodyMessage: "Validation failed",
    errorEmail: "Email must not exceed 25 characters",
    errorPassword: "Password must be between 6 and 20 characters",
  },
  invalidEmailAndNoCapital: {
    testDescription:
      "API call with invalid email and password with no capital letter - Expect 400 Bad Request and error messages",
    request: {
      email: "test@test.",
      confirmEmail: "test@test.",
      password: "t3sting",
    },
    responseStatus: 400,
    responseBodyMessage: "Validation failed",
    errorEmail: "Please enter a valid email address",
    errorPassword: "Password must contain at least one capital letter",
  },
  invalidEmailAndNoDigit: {
    testDescription:
      "API call with invalid email and password with no digit - Expect 400 Bad Request and error messages",
    request: {
      email: "@.net",
      confirmEmail: "@.net",
      password: "Testing",
    },
    responseStatus: 400,
    responseBodyMessage: "Validation failed",
    errorEmail: "Please enter a valid email address",
    errorPassword: "Password must contain at least one digit",
  },
  invalidEmailAndTooShort: {
    testDescription:
      "API call with invalid email and password is too short - Expect 400 Bad Request and error messages",
    request: {
      email: "testtest.net",
      confirmEmail: "testtest.net",
      password: "T3stt",
    },
    responseStatus: 400,
    responseBodyMessage: "Validation failed",
    errorEmail: "Please enter a valid email address",
    errorPassword: "Password must be between 6 and 20 characters",
  },
  validEmailButConfirmDoesNotMatch: {
    testDescription:
      "API call with valid email but confirm email does not match - Expect 400 Bad Request and error messages",
    request: {
      email: "test@test.net",
      confirmEmail: "testa@test.net",
      password: "t3sting",
    },
    responseStatus: 400,
    responseBodyMessage: "Validation failed",
    errorEmail: undefined,
    errorPassword: "Password must contain at least one capital letter",
    errorConfirmEmail: "Emails do not match",
  },
  validEmailConfirmEmailAndPassword: {
    testDescription:
      "API call with valid email, confirm email and password - Expect 200 OK and message registration successful",
    request: {
      email: "test@test.net",
      confirmEmail: "test@test.net",
      password: "T3sting",
    },
    responseStatus: 200,
    responseBodyMessage: "Registration successful",
    errorEmail: undefined,
    errorPassword: undefined,
    errorConfirmEmail: undefined,
  },
};
