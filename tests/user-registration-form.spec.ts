import { test, expect } from "@playwright/test";
import { RegistrationForm } from "../src/pages/registration.page";
import { validTestInput, invalidEmailFormat, invalidPasswordInput } from "../test-data/test-data";

const pageUrl = "https://abc13514.sg-host.com/";
const apiUrl = "https://abc13514.sg-host.com/api.php";

test.describe("Automation Test Suite - User Registration Form", () => {
  let registrationForm: RegistrationForm;

  test.beforeEach(async ({ page }) => {
    // Always start from the registration page
    await page.goto(pageUrl);
    registrationForm = new RegistrationForm(page);
  });

  test.describe("Email Address field", async () => {
    for (const invalidEmailInputEntry of Object.entries(invalidEmailFormat)) {
      const [key, value] = invalidEmailInputEntry;
      test(`Fill in invalid email format (${key}) - Expect validation email error, error class and confirm button to be disabled`, async () => {
        await registrationForm.fillEmail(value);
        await expect(
          registrationForm.getErrorMessageLocator("Please enter a valid email address")
        ).toBeVisible();
        const emailInputClass = await registrationForm.emailLocator().getAttribute("class");
        expect(emailInputClass).toContain("error");
        await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
      });
    }

    test("Fill in invalid email address above max length - Expect validation email error, error class and confirm button to be disabled", async () => {
      await registrationForm.fillEmail("test@test1234567891234.net");
      await expect(registrationForm.getErrorMessageLocator("Email must not exceed 25 characters")).toBeVisible();
      const emailInputClass = await registrationForm.emailLocator().getAttribute("class");
      expect(emailInputClass).toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });

    test("Fill in invalid email address only empty spaces - Expect validation email error, error class and confirm button to be disabled", async () => {
      await registrationForm.fillEmail("             ");
      await expect(registrationForm.getErrorMessageLocator("Email is required")).toBeVisible();
      const emailInputClass = await registrationForm.emailLocator().getAttribute("class");
      expect(emailInputClass).toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });
  });

  test.describe("Confirm Email field", async () => {
    test("Fill in valid email and invalid confirm email - Expect enter a valid email address, class error and disabled button", async () => {
      await registrationForm.fillEmail(invalidEmailFormat.invalidEmailNoTld);
      await registrationForm.fillConfirmEmail(invalidEmailFormat.invalidEmailNoTld);
      await expect(registrationForm.getErrorMessageLocator("Please enter a valid email address")).toBeVisible();
      const emailInputClass = await registrationForm.emailLocator().getAttribute("class");
      expect(emailInputClass).toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });

    test("Fill in invalid email and invalid confirm email - Expect emails do not match, class error and disabled button", async () => {
      await registrationForm.fillEmail(validTestInput.validEmail);
      await registrationForm.fillConfirmEmail(invalidEmailFormat.invalidEmailNoTld);
      await expect(registrationForm.getErrorMessageLocator("Emails do not match")).toBeVisible();
      const emailConfirmClass = await registrationForm.confirmEmailLocator().getAttribute("class");
      expect(emailConfirmClass).toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });

    test("Fill in valid email and valid confirm email - Expect no error class, and disabled confirm button", async () => {
      await registrationForm.fillEmail(validTestInput.validEmail);
      await registrationForm.fillConfirmEmail(validTestInput.validEmail);
      await expect(registrationForm.getErrorMessageLocator("Emails do not match")).not.toBeVisible();
      const emailConfirmClass = await registrationForm.confirmEmailLocator().getAttribute("class");
      expect(emailConfirmClass).not.toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });
  });

  test.describe("Password field", async () => {
    test("Fill in invalid password empty spaces - Expect must contain capital letter, class error and disabled confirm button", async () => {
      await registrationForm.fillPassword(invalidPasswordInput.invalidPasswordEmptySpaces);
      await expect(
        registrationForm.getErrorMessageLocator("Password must contain at least one capital letter")
      ).toBeVisible();
      const passwordClass = await registrationForm.passwordLocator().getAttribute("class");
      expect(passwordClass).toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });
    test("Fill in invalid password too short - Expect must contain capital letter, class error and disabled confirm button", async () => {
      await registrationForm.fillPassword(invalidPasswordInput.invalidPasswordTooShort);
      await expect(
        registrationForm.getErrorMessageLocator("Password must be between 6 and 20 characters")
      ).toBeVisible();
      const passwordClass = await registrationForm.passwordLocator().getAttribute("class");
      expect(passwordClass).toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });
    test("Fill in invalid password too long - Expect must contain capital letter, class error and disabled confirm button", async () => {
      await registrationForm.fillPassword(invalidPasswordInput.invalidPasswordTooLong);
      await expect(
        registrationForm.getErrorMessageLocator("Password must be between 6 and 20 characters")
      ).toBeVisible();
      const passwordClass = await registrationForm.passwordLocator().getAttribute("class");
      expect(passwordClass).toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });
    test("Fill in invalid password no digit - Expect must contain digit, class error and disabled confirm button", async () => {
      await registrationForm.fillPassword(invalidPasswordInput.invalidPasswordNoDigit);
      await expect(
        registrationForm.getErrorMessageLocator("Password must contain at least one digit")
      ).toBeVisible();
      const passwordClass = await registrationForm.passwordLocator().getAttribute("class");
      expect(passwordClass).toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });
    test("Fill in invalid password no uppercase - Expect must contain capital letter, class error and disabled confirm button", async () => {
      await registrationForm.fillPassword(invalidPasswordInput.invalidPasswordNoUppercase);
      await expect(
        registrationForm.getErrorMessageLocator("Password must contain at least one capital letter")
      ).toBeVisible();
      const passwordClass = await registrationForm.passwordLocator().getAttribute("class");
      expect(passwordClass).toContain("error");
      await expect(registrationForm.confirmBtnLocator()).toBeDisabled();
    });
    test("Toggle password visibility button - Expect password field to have type text, toggle button to change title and match password input value ", async () => {
      await registrationForm.fillPassword(validTestInput.validPassword);
      await registrationForm.page.locator(".toggle-password-btn").click();

      const passwordFieldType = await registrationForm.passwordLocator().getAttribute("type");
      expect(passwordFieldType).toBe("text");
      const passwordFieldValue = await registrationForm.passwordLocator().inputValue();
      expect(passwordFieldValue).toBe(validTestInput.validPassword);
      const passwordToggleBtnTitle = await registrationForm.page
        .locator(".toggle-password-btn")
        .getAttribute("title");
      expect(passwordToggleBtnTitle).toBe("Hide password");
    });
  });

  test.describe("Password strenght indicator", async () => {
    test("Password indicator with moderate password - Expect indicator to be orange and 40% width", async () => {
      await registrationForm.fillPassword(validTestInput.validPassword);
      const passwordStrengthBar = await registrationForm.passwordStrenghtBarIndicatorLocator();
      const width = await passwordStrengthBar.evaluate(el => el.style.width);
      const color = await passwordStrengthBar.evaluate(el => el.style.backgroundColor);
      expect(width).toBe("40%");
      expect(color).toBe("rgb(243, 156, 18)");
    });

    test("Password indicator with strong password - Expect indicator to be blue and 80% width", async () => {
      await registrationForm.fillPassword(validTestInput.strongPassword);
      const passwordStrengthBar = await registrationForm.passwordStrenghtBarIndicatorLocator();
      const width = await passwordStrengthBar.evaluate(el => el.style.width);
      const color = await passwordStrengthBar.evaluate(el => el.style.backgroundColor);
      expect(width).toBe("80%");
      expect(color).toBe("rgb(52, 152, 219)");
    });

    test("Password indicator with very strong password - Expect indicator to be green and 100% width", async () => {
      await registrationForm.fillPassword(validTestInput.veryStrongPassword);
      const passwordStrengthBar = await registrationForm.passwordStrenghtBarIndicatorLocator();
      const width = await passwordStrengthBar.evaluate(el => el.style.width);
      const color = await passwordStrengthBar.evaluate(el => el.style.backgroundColor);
      expect(width).toBe("100%");
      expect(color).toBe("rgb(39, 174, 96)");
    });
  });

  test.describe("API endpoint tests", async () => {
    test("API call with valid details - Expect correct content type and response body", async ({ request }) => {
      const response = await registrationForm.directApiRequestWithCustomData(pageUrl, apiUrl, request, {
        email: validTestInput.validEmail,
        confirmEmail: validTestInput.validEmail,
        password: validTestInput.validPassword,
      });

      expect(response.headers()["content-type"]).toBe("application/json");
      const responseBody = await response.json();
      expect(responseBody).toMatchObject({
        success: true,
        message: "Registration successful",
        errors: expect.any(Array),
        timestamp: expect.any(String),
      });
    });
    test("API call with valid details - Expect 200 OK and message registration successfull", async ({
      request,
    }) => {
      const response = await registrationForm.directApiRequestWithCustomData(pageUrl, apiUrl, request, {
        email: validTestInput.validEmail,
        confirmEmail: validTestInput.validEmail,
        password: validTestInput.validPassword,
      });
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(responseBody.message).toBe("Registration successful");
    });
    test("API call with invalid email and password - Expect 400 Bad Request and error messages", async ({
      request,
    }) => {
      const response = await registrationForm.directApiRequestWithCustomData(pageUrl, apiUrl, request, {
        email: invalidEmailFormat.invalidEmailNoTld,
        confirmEmail: invalidEmailFormat.invalidEmailNoTld,
        password: invalidPasswordInput.invalidPasswordTooShort,
      });
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody.message).toBe("Validation failed");
      expect(responseBody.errors.email).toEqual("Please enter a valid email address");
      expect(responseBody.errors.password).toEqual("Password must be between 6 and 20 characters");
    });

    test("API call with valid email but confirm email does not match - Expect 400 Bad Request and error messages", async ({
      request,
    }) => {
      const response = await registrationForm.directApiRequestWithCustomData(pageUrl, apiUrl, request, {
        email: validTestInput.validEmail,
        confirmEmail: validTestInput.diffrentConfirmEmail,
        password: invalidPasswordInput.invalidPasswordNoUppercase,
      });
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody.message).toBe("Validation failed");
      expect(responseBody.errors.confirmEmail).toEqual("Emails do not match");
      expect(responseBody.errors.password).toEqual("Password must contain at least one capital letter");
    });

    test("API call with invalid email and password that are too long - Expect 400 Bad Request and error messages", async ({
      request,
    }) => {
      const response = await registrationForm.directApiRequestWithCustomData(pageUrl, apiUrl, request, {
        email: "test@test1234567891234.net",
        confirmEmail: "test@test1234567891234.net",
        password: invalidPasswordInput.invalidPasswordTooLong,
      });
      expect(response.status()).toBe(400);
      const responseBody = await response.json();
      expect(responseBody.message).toBe("Validation failed");
      expect(responseBody.errors.email).toEqual("Email must not exceed 25 characters");
      expect(responseBody.errors.password).toEqual("Password must be between 6 and 20 characters");
    });
  });

  test("Fill in all fields with valid input data - Expect registration successful!, and API success response (200 OK)", async () => {
    await registrationForm.fillEmail(validTestInput.validEmail);
    await registrationForm.fillConfirmEmail(validTestInput.validEmail);
    await registrationForm.fillPassword(validTestInput.validPassword);
    const response = await registrationForm.clickConfirmAndwaitForResponseFromApi(apiUrl);
    await expect(registrationForm.page.getByText("Registration successful!")).toBeVisible();
    expect(response.status()).toBe(200);
  });

  test("Click confirm with no input - Expect required input errors to show up", async () => {
    const apiRequested = await registrationForm.checkIfApiRequestsAreMadeOnConfirmClick(apiUrl);
    await expect(registrationForm.page.getByText("Email is required")).toBeVisible();
    await expect(registrationForm.page.getByText("Please confirm your email")).toBeVisible();
    await expect(registrationForm.page.getByText("Password is required")).toBeVisible();
    expect(apiRequested).toBe(false);
  });

  test("Click confirm with no input - Expect all inputs to have class error", async () => {
    const apiRequested = await registrationForm.checkIfApiRequestsAreMadeOnConfirmClick(apiUrl);
    const emailInputClass = await registrationForm.emailLocator().getAttribute("class");
    expect(emailInputClass).toContain("error");
    const emailConfirmClass = await registrationForm.confirmEmailLocator().getAttribute("class");
    expect(emailConfirmClass).toContain("error");
    const passwordClass = await registrationForm.passwordLocator().getAttribute("class");
    expect(passwordClass).toContain("error");
    expect(apiRequested).toBe(false);
  });
});
