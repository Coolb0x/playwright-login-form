export const validTestInput = {
  validEmail: "test@test.net",
  diffrentConfirmEmail: "testa@test.net",
  emailWith25Char: "test@test123456789123.net",
  validPassword: "T3sting",
  veryStrongPassword: "T3stingStrong@!",
  strongPassword: "T3sting@",
};

export const invalidEmailFormat = {
  invalidEmailNoTld: "test@test.",
  invalidEmailNoDot: "test@test",
  invalidEmailNoAt: "testtest.net",
  invalidEmailNoDomain: "test@test.",
  invalidEmailNoUser: "@test.net",
  invalidEmailNoUserOrDomain: "@.net",
  invalidEmailNoUserOrTld: "@test.",
  invalidEmailNoUserOrDomainOrTld: "@test",
};

export const invalidPasswordInput = {
  invalidPasswordEmptySpaces: "         ",
  invalidPasswordTooShort: "T3stt",
  invalidPasswordNoUppercase: "t3sting",
  invalidPasswordTooLong: "T3stingT3stingT3stingT3stingT3stingT3sting",
  invalidPasswordNoDigit: "Testing",
};
