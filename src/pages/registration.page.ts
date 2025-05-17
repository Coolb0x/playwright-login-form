import { Page } from "@playwright/test";

export class RegistrationForm {
  readonly page: Page;

  /**
   * Creates an instance of RegistrationForm.
   * @param page Playwright Page object for browser interaction.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Returns the email address field locator.
   * @returns The email field locator: [data-cy="email-input"]
   * @example
   * registrationPage.emailLocator();
   */
  emailLocator() {
    return this.page.locator('[data-cy="email-input"]');
  }

  /**
   * Fills the email address field.
   * @param email The email address to input.
   * @example
   * registrationPage.fillEmail('user@example.com');
   */
  async fillEmail(email: string) {
    await this.emailLocator().fill(email);
  }

  /**
   * Returns the confirm email address field locator.
   * @returns The confirm email field locator: [name="confirmEmail"]
   * @example
   * registrationPage.confirmEmailLocator();
   */
  confirmEmailLocator() {
    return this.page.locator('[name="confirmEmail"]');
  }

  /**
   * Fills the confirm email address field.
   * @param email The email address to confirm.
   * @example
   * registrationPage.fillConfirmEmail('user@example.com');
   */
  async fillConfirmEmail(email: string) {
    await this.confirmEmailLocator().fill(email);
  }

  /**
   * Returns the password strength bar indicator locator.
   * @returns The password strength bar indicator locator: [id="strength-bar"]
   * @example
   * registrationPage.passwordStrenghtBarIndicatorLocator();
   */
  passwordStrenghtBarIndicatorLocator() {
    return this.page.locator('[id="strength-bar"]');
  }

  /**
   * Returns the password field locator.
   * @returns The password field locator: [data-automation="password-field"]
   * @example
   * registrationPage.passwordLocator();
   */
  passwordLocator() {
    return this.page.locator('[data-automation="password-field"]');
  }

  /**
   * Fills the password field.
   * @param password The password to input.
   * @example
   * await registrationPage.fillPassword('MySecret123');
   */
  async fillPassword(password: string) {
    await this.passwordLocator().fill(password);
  }

  /**
   * Returns the confirm button locator.
   * @returns The confirm button locator: #submitBtn
   * @example
   * registrationPage.confirmBtnLocator();
   */
  confirmBtnLocator() {
    return this.page.locator("#submitBtn");
  }

  /**
   * Returns a locator for an error message by its text.
   * @param text The error message text to locate.
   * @returns The locator for the error message.
   * @example
   * registrationForm.getErrorMessageLocator('Email is required');
   */
  getErrorMessageLocator(text: string) {
    return this.page.getByText(text);
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
    await this.confirmBtnLocator().click();
  }

  /**
   * Checks if an API request is made to the given API URL when the confirm button is clicked.
   * @param apiUrl The API URL to check for requests.
   * @returns True if the API was requested, false otherwise.
   * @example
   * const requested = await registrationPage.checkIfApiRequestsAreMadeOnConfirmClick(apiUrl);
   */
  async checkIfApiRequestsAreMadeOnConfirmClick(apiUrl: string) {
    let apiRequested = false;
    this.page.on("request", request => {
      if (request.url() === apiUrl) {
        apiRequested = true;
      }
    });
    await this.clickConfirmButton();
    return apiRequested;
  }

  /**
   * Sends a direct API request with custom data and waits for the response.
   * @param pageUrl Url of the page where the registration form is located.
   * @param apiUrl The API URL to send the request to.
   * @param request Request fixture (from test context).
   * @param data The registration data: { email, confirmEmail, password }.
   * @returns The API response object.
   * @example
   * const response = await registrationForm.directApiRequestWithCustomData(pageUrl, apiUrl, request, {
   *   email: 'user@example.com',
   *   confirmEmail: 'user@example.com',
   *   password: 'MySecret123'
   * });
   */
  async directApiRequestWithCustomData(
    pageUrl: string,
    apiUrl: string,
    request: any,
    data: { email: string; confirmEmail: string; password: string }
  ) {
    const response = await request.post(apiUrl, {
      data,
      headers: {
        "sec-ch-ua-platform": '"Windows"',
        Referer: `${pageUrl}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.25 Safari/537.36",
        "sec-ch-ua": '"Chromium";v="136", "HeadlessChrome";v="136", "Not.A/Brand";v="99"',
        "Content-Type": "application/json",
        "sec-ch-ua-mobile": "?0",
        "Accept-Language": "en-US",
      },
    });
    return response;
  }

  /**
   * Clicks the submit button and waits for a response from the registration API endpoint.
   * @param apiUrl The API URL to wait for a response from.
   * @returns Response object for the registration API call.
   * @example
   * const response = await registrationPage.clickConfirmAndwaitForResponseFromApi('https://domain-name.com/api.php');
   */
  async clickConfirmAndwaitForResponseFromApi(apiUrl: string) {
    const [response] = await Promise.all([
      this.page.waitForResponse(resp => resp.url() === apiUrl),
      this.clickConfirmButton(),
    ]);
    return response;
  }
}
