import { expect, test } from "@playwright/test";

interface apiData {
  blockNetwork: boolean;
  email: string;
  confirmEmail: string;
  password: string;
}

/**
 * Sends a POST request to the registration API endpoint with the provided data.
 * @param request - The Playwright request context to use for the API call.
 * @param data - The registration data to send in the request body.
 * @returns The response object from the API call.
 */
export const callApiWithData = async (request: any, data: apiData) => {
  const response = await request.post("/api.php", { data });
  return response;
};

/**
 * Checks the API response against the expected values from the test case data.
 * Asserts status, message, and error fields for email, password, and confirmEmail as needed.
 * @param response - The response object returned from the API call.
 * @param apiRequestData - The test case data containing expected values for assertions.
 */
export const checkApiResponse = async (response: any, apiRequestData: any) => {
  const {
    testDescription,
    request: reqData,
    responseStatus,
    responseBodyMessage,
    errorEmail,
    errorPassword,
    errorConfirmEmail,
  } = apiRequestData;

  await test.step("Check response status", async () => {
    expect(response.status()).toBe(responseStatus);
  });

  const responseBody = await response.json();

  await test.step("Check response message", async () => {
    expect(responseBody.message).toBe(responseBodyMessage);
  });

  if (errorEmail !== undefined) {
    await test.step("Check email error message", async () => {
      expect(responseBody.errors.email).toEqual(errorEmail);
    });
  }
  if (errorPassword !== undefined) {
    await test.step("Check password error message", async () => {
      expect(responseBody.errors.password).toEqual(errorPassword);
    });
  }
  if (errorConfirmEmail !== undefined) {
    await test.step("Check confirmEmail error message", async () => {
      expect(responseBody.errors.confirmEmail).toEqual(errorConfirmEmail);
    });
  }
};
