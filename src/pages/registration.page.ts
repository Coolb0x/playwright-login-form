import { Page, Locator, expect, test } from "@playwright/test";

export class RegistrationForm {
  readonly page: Page;
  private readonly emailInput: Locator;
  private readonly confirmEmailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmButton: Locator;
  private readonly passwordStrengthBar: Locator;
  private readonly errorMessage: Locator;

  /**
   * Creates an instance of RegistrationForm.
   * @param page Playwright Page object for browser interaction.
   */
  constructor(page: Page) {
    this.page = page;

    /**
     * Returns the email address field locator.
     * @returns The email field locator: [data-cy="email-input"]
     * @example
     * registrationPage.emailLocator();
     */
    this.emailInput = this.page.locator('[data-cy="email-input"]');
    /**
     * Returns the confirm email address field locator.
     * @returns The confirm email field locator: [name="confirmEmail"]
     * @example
     * registrationPage.confirmEmailLocator();
     */
    this.confirmEmailInput = this.page.locator('[name="confirmEmail"]');
    /**
     * Returns the password field locator.
     * @returns The password field locator: [data-automation="password-field"]
     * @example
     * registrationPage.passwordLocator();
     */
    this.passwordInput = this.page.locator('[data-automation="password-field"]');
    /**
     * Returns the confirm button locator.
     * @returns The confirm button locator: #submitBtn
     * @example
     * registrationPage.confirmBtnLocator();
     */
    this.confirmButton = this.page.locator("#submitBtn");
    /**
     * Returns the password strength bar indicator locator.
     * @returns The password strength bar indicator locator: [id="strength-bar"]
     * @example
     * registrationPage.passwordStrenghtBarIndicatorLocator();
     */
    this.passwordStrengthBar = this.page.locator('[id="strength-bar"]');
  }

  /**
   * Fills the email address field.
   * @param email The email address to input.
   * @example
   * registrationPage.fillEmail('user@example.com');
   */
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  /**
   * Fills the confirm email address field.
   * @param email The email address to confirm.
   * @example
   * registrationPage.fillConfirmEmail('user@example.com');
   */
  async fillConfirmEmail(email: string) {
    await this.confirmEmailInput.fill(email);
  }

  /**
   * Fills the password field.
   * @param password The password to input.
   * @example
   * await registrationPage.fillPassword('MySecret123');
   */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Asserts that the error message is visible, the email input has the 'error' class, and the confirm button is disabled.
   * @param message The error message expected to be visible.
   * @example
   * await registrationForm.expectLineError('Please enter a valid email address');
   */
  async expectLineError(message: string, field: "email" | "confirmEmail" | "password", skipConfirm?: boolean) {
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

  async expectPasswordStrenghtBar(strength: string) {
    const width = await this.passwordStrengthBar.evaluate(el => el.style.width);
    const color = await this.passwordStrengthBar.evaluate(el => el.style.backgroundColor);

    if (strength === "moderate") {
      expect(width).toBe("40%");
      expect(color).toBe("rgb(243, 156, 18)");
    }
    if (strength === "strong") {
      expect(width).toBe("80%");
      expect(color).toBe("rgb(52, 152, 219)");
    }
    if (strength === "veryStrong") {
      expect(width).toBe("100%");
      expect(color).toBe("rgb(39, 174, 96)");
    }
  }

  /**
   * Fills the registration form with email, confirm email, and password.
   * @param email The email address to input.
   * @param confirmEmail The confirm email address to input.
   * @param password The password to input.
   * @example
   * await registrationForm.fillForm('user@example.com', 'user@example.com', 'MySecret123');
   */
  async fillForm(email: string, confirmEmail: string, password: string) {
    await this.fillEmail(email);
    await this.fillConfirmEmail(confirmEmail);
    await this.fillPassword(password);
  }

  /**
   * Clicks the Confirm button of the registration form.
   * @example
   * await registrationForm.clickConfirmButton();
   */

  async clickConfirmButton() {
    await this.confirmButton.click();
  }

  /**
   * Clicks the submit button and waits for a response from the registration API endpoint.
   * @param apiUrl The API URL to wait for a response from.
   * @returns Response object for the registration API call.
   * @example
   * const response = await registrationPage.clickConfirmAndwaitForResponseFromApi('https://domain-name.com/api.php');
   */
  async clickConfirmAndwaitForResponseFromApi() {
    const baseUrl = test.info().project.use.baseURL;
    console.log("Base URL:", baseUrl);
    const [response] = await Promise.all([
      this.page.waitForResponse(resp => resp.url() === `${baseUrl}api.php`),
      this.clickConfirmButton(),
    ]);
    return response;
  }
}
