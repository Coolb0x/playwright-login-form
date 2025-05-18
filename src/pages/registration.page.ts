import { Page, Locator, expect, test } from "@playwright/test";

/**
 * Page Object Model for the User Registration Form.
 * Encapsulates all locators and actions for interacting with the registration form UI.
 */
export class RegistrationForm {
  readonly page: Page;
  private readonly emailInput: Locator;
  private readonly confirmEmailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmButton: Locator;
  private readonly passwordStrengthBar: Locator;
  private readonly passwordVisibilityToggle: Locator;

  /**
   * Creates an instance of RegistrationForm.
   * @param page Playwright Page object for browser interaction.
   */
  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.locator('[data-cy="email-input"]');
    this.confirmEmailInput = this.page.locator('[name="confirmEmail"]');
    this.passwordInput = this.page.locator('[data-automation="password-field"]');
    this.confirmButton = this.page.locator("#submitBtn");
    this.passwordStrengthBar = this.page.locator('[id="strength-bar"]');
    this.passwordVisibilityToggle = this.page.locator(".toggle-password-btn");
  }

  /**
   * Fills the email address field.
   * @param email - The email address to input.
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Fills the confirm email address field.
   * @param email - The email address to confirm.
   */
  async fillConfirmEmail(email: string): Promise<void> {
    await this.confirmEmailInput.fill(email);
  }

  /**
   * Fills the password field.
   * @param password - The password to input.
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Asserts that the error message is visible, the specified input has the 'error' class, and the confirm button is disabled (unless skipConfirm is true).
   * @param message - The error message expected to be visible.
   * @param field - The field to check for the error class ("email", "confirmEmail", or "password").
   * @param skipConfirm - If true, skips the confirm button disabled check.
   */
  async expectLineError(
    message: string,
    field: "email" | "confirmEmail" | "password",
    skipConfirm?: boolean
  ): Promise<void> {
    await test.step(`Expect error message "${message}" to be visible`, async () => {
      await expect(this.page.getByText(message)).toBeVisible();
    });

    await test.step(`Expect ${field} input to have 'error' class`, async () => {
      if (field === "email") {
        await expect(this.emailInput).toHaveClass(/error/);
      } else if (field === "confirmEmail") {
        await expect(this.confirmEmailInput).toHaveClass(/error/);
      } else if (field === "password") {
        await expect(this.passwordInput).toHaveClass(/error/);
      }
    });

    if (!skipConfirm) {
      await test.step("Expect confirm button to be disabled", async () => {
        await expect(this.confirmButton).toBeDisabled();
      });
    }
  }

  async togglePasswordVisibility(): Promise<void> {
    return this.passwordVisibilityToggle.click();
  }

  async expectPasswordVisibility(passwordValue): Promise<void> {
    const passwordFieldType = await this.passwordInput.getAttribute("type");

    test.step("Check password field type", async () => {
      expect(passwordFieldType).toBe("text");
    });

    const passwordFieldValue = await this.passwordInput.inputValue();
    test.step("Check password field value", async () => {
      expect(passwordFieldValue).toBe(passwordValue);
    });

    const passwordToggleBtnTitle = await this.passwordVisibilityToggle.getAttribute("title");
    test.step("Check password toggle button title", async () => {
      expect(passwordToggleBtnTitle).toBe("Hide password");
    });
  }

  /**
   * Asserts the password strength bar's width and color for a given strength level.
   * @param strength - The password strength level ("moderate", "strong", or "veryStrong").
   */
  async expectPasswordStrenghtBar(strength: string): Promise<void> {
    await test.step(`Check password strength bar for '${strength}'`, async () => {
      const width = await this.passwordStrengthBar.evaluate(el => el.style.width);
      const color = await this.passwordStrengthBar.evaluate(el => el.style.backgroundColor);
      if (strength === "weak") {
        expect(width).toBe("20%");
        expect(color).toBe("rgb(231, 76, 60)");
      } else if (strength === "moderate") {
        expect(width).toBe("40%");
        expect(color).toBe("rgb(243, 156, 18)");
      } else if (strength === "strong") {
        expect(width).toBe("80%");
        expect(color).toBe("rgb(52, 152, 219)");
      } else if (strength === "veryStrong") {
        expect(width).toBe("100%");
        expect(color).toBe("rgb(39, 174, 96)");
      }
    });
  }

  /**
   * Fills the registration form with email, confirm email, and password.
   * @param email - The email address to input.
   * @param confirmEmail - The confirm email address to input.
   * @param password - The password to input.
   */
  async fillForm(email: string, confirmEmail: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillConfirmEmail(confirmEmail);
    await this.fillPassword(password);
  }

  /**
   * Clicks the Confirm button of the registration form.
   */
  async clickConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }

  /**
   * Clicks the submit button and waits for a response from the registration API endpoint.
   * Uses the Playwright config baseURL to construct the API endpoint.
   * @returns The response object for the registration API call.
   */
  async clickConfirmAndwaitForResponseFromApi(): Promise<any> {
    const baseUrl = test.info().project.use.baseURL;
    const [response] = await Promise.all([
      this.page.waitForResponse(resp => resp.url() === `${baseUrl}api.php`),
      this.clickConfirmButton(),
    ]);
    return response;
  }
}
