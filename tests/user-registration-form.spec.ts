import { test, expect } from "@playwright/test";
import { RegistrationForm } from "../src/pages/registration.page";
import { validTestInput } from "../test-data/valid-input";
import { invalidEmailFormat } from "../test-data/invalid-email-format";
import { invalidPasswordInput } from "../test-data/invalid-password-input";
import { validPasswordStrength } from "../test-data/valid-password-strength";
import { apiRequests } from "../test-data/api-requests";
import { callApiWithData, checkApiResponse } from "../utils/api-helpers";

test.describe("Automation Test Suite - User Registration Form", () => {
  let registrationForm: RegistrationForm;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    registrationForm = new RegistrationForm(page);
  });

  test.describe("Email Address field", async () => {
    for (const key of Object.keys(invalidEmailFormat)) {
      const { value, testDescription, errorMessage } = invalidEmailFormat[key];
      test(testDescription, async () => {
        await registrationForm.fillEmail(value);
        await registrationForm.expectLineError(errorMessage, "email");
      });
    }
  });

  test.describe("Confirm Email field", async () => {
    test("Fill in invalid email and invalid confirm email - Expect enter a valid email address, class error and disabled button", async () => {
      await registrationForm.fillEmail(invalidEmailFormat.invalidEmailNoTld.value);
      await registrationForm.fillConfirmEmail(invalidEmailFormat.invalidEmailNoTld.value);
      await registrationForm.expectLineError("Please enter a valid email address", "email");
    });

    test("Fill in valid email and different confirm email - Expect emails do not match, class error and disabled button", async () => {
      await registrationForm.fillEmail(validTestInput.validEmail);
      await registrationForm.fillConfirmEmail(validTestInput.diffrentConfirmEmail);
      await registrationForm.expectLineError("Emails do not match", "confirmEmail");
    });

    test("Fill in empty spaces for email and confirm email - Expect error class, and disabled confirm button", async () => {
      await registrationForm.fillEmail(invalidEmailFormat.invalidEmailEmpty.value);
      await registrationForm.fillConfirmEmail(invalidEmailFormat.invalidEmailEmpty.value);
      await registrationForm.expectLineError("Email is required", "email");
    });
  });

  test.describe("Password field", async () => {
    for (const key of Object.keys(invalidPasswordInput)) {
      const { invalidPasswordValue, testDescription, errorMessage } = invalidPasswordInput[key];
      test(testDescription, async () => {
        await registrationForm.fillPassword(invalidPasswordValue);
        await registrationForm.expectLineError(errorMessage, "password");
      });
    }

    test("Fill in valid password and toggle password visibility button - Expect password field to have type text, toggle button to change title and match password input value ", async () => {
      await registrationForm.fillPassword(validTestInput.validPassword);
      await registrationForm.togglePasswordVisibility();
      await registrationForm.expectPasswordVisibility(validTestInput.validPassword);
    });
  });

  test.describe("Password strength indicator", async () => {
    for (const strength of Object.keys(validPasswordStrength)) {
      test(`Password strength indicator with ${strength} password`, async () => {
        await registrationForm.fillPassword(validPasswordStrength[strength]);
        await registrationForm.expectPasswordStrenghtBar(strength);
      });
    }
  });

  test.describe("API endpoint tests", async () => {
    for (const key of Object.keys(apiRequests)) {
      const testCaseData = apiRequests[key];
      test(testCaseData.testDescription, async ({ request }) => {
        const response = await callApiWithData(request, testCaseData.request);
        await checkApiResponse(response, testCaseData);
      });
    }
  });

  test.describe("Generic user flows", async () => {
    test("Fill in all fields with valid input data - Expect registration successful!, and API success response (200 OK)", async () => {
      await registrationForm.fillEmail(validTestInput.validEmail);
      await registrationForm.fillConfirmEmail(validTestInput.validEmail);
      await registrationForm.fillPassword(validTestInput.validPassword);
      const response = await registrationForm.clickConfirmAndwaitForResponseFromApi();
      await expect(registrationForm.page.getByText("Registration successful!")).toBeVisible();
      expect(response.status()).toBe(200);
    });

    test("Click confirm with no input - Expect required input errors to show up", async () => {
      await registrationForm.clickConfirmButton();
      const skipConfirmButtonCheck = true;
      await registrationForm.expectLineError("Email is required", "email", skipConfirmButtonCheck);
      await registrationForm.expectLineError(
        "Please confirm your email",
        "confirmEmail",
        skipConfirmButtonCheck
      );
      await registrationForm.expectLineError("Password is required", "password", skipConfirmButtonCheck);
    });

    test("Valid input data, but API is unavailable", async ({ page }) => {
      await page.route("**/api.php", route => {
        route.abort("failed");
      });
      await page.goto("/");
      const registrationForm = new RegistrationForm(page);
      await registrationForm.fillEmail(validTestInput.validEmail);
      await registrationForm.fillConfirmEmail(validTestInput.validEmail);
      await registrationForm.fillPassword(validTestInput.validPassword);
      await registrationForm.clickConfirmButton();
      expect(registrationForm.page.getByText("Network error. Please try again later.")).toBeVisible();
    });
  });
});
