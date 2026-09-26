// import { expect } from "@playwright/test";
// import test from "../lambdatest-setup";
const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('PlayWright Vanilla JS - 1', () => {
test("Simple Form Demo - displays correct message", async ({ page }) => {
  await page.goto("https://www.testmuai.com/selenium-playground/");

  await page.locator("//a[text()='Simple Form Demo']").click();

  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/.*simple-form-demo/);

  const message = "Welcome to lambda test";

  await page.waitForTimeout(2000);
  await page
    .locator('input[placeholder="Please enter your Message"]')
    .fill(message);

    await page.waitForTimeout(2000);
  await page.locator("#showInput").click();

  await page.waitForTimeout(6000);
  const displayedText = await page.locator("#message").textContent();
  expect(displayedText?.trim()).toBe(message);
})
})
