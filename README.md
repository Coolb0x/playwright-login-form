# playwright-login-form

Test automation suite for a demo login form

## Documentation

### Setup Instructions

1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Run all Playwright tests**
   ```sh
   npx playwright test
   ```
3. **View Playwright HTML report**
   ```sh
   npx playwright show-report
   ```
4. **Run a specific test file**
   ```sh
   npx playwright test tests/user-registration-form.spec.ts
   ```

### Generated Playwright-report

[<img alt="playwright-report" width="375px" src="https://testb0x.net/user-login-form/Screenshot.png" />](https://testb0x.net/user-login-form/playwright-report/index.html)

### Brief Explanation of Approach and Choices

- **Page Object Model (POM):**
  The test suite uses the Page Object Model pattern for maintainability and readability. All page interactions are encapsulated in the `RegistrationForm` class, making locators and actions reusable and easy to update.

- **Selector Strategy:**
  The tests use robust selectors such as `data-cy` attributes and unique `id` or `name` attributes to ensure stability and reduce flakiness.

- **Test Coverage:**
  The suite covers a wide range of scenarios, including:

  - Field validation for email, confirm email and password
  - UI feedback (error messages, input classes)
  - API integration and validation of backend responses
  - Password strength indicator and toggle functionality

---
