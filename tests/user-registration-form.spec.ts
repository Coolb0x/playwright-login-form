import { test, expect } from "@playwright/test";

test.describe("Automation Test Suite - User Registration Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://abc13514.sg-host.com/");
  });

  test("Check H1", async ({ page }) => {
    const h1InnerText = await page.locator("h1").innerText();

    expect(h1InnerText).toBe("User Registration");
  });

  test("Check form by using html element and class locator", async ({ page }) => {
    await expect(page.locator("form.registration-form")).toBeVisible();
  });

  test("Email Address field", async ({ page }) => {
    await page.locator('[data-cy="email-input"]').fill("test@test.net");

    await expect(page.locator("#submitBtn")).toBeDisabled();
  });
});
