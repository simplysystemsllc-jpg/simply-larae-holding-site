import { test, expect } from "@playwright/test";

test.describe("Form Submissions", () => {
  test("Waitlist form submits successfully", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /join the waitlist/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByLabel(/full name/i).fill("Test User");
    await page.getByLabel(/email address/i).first().fill("test@example.com");
    await page.getByLabel(/phone number/i).fill("5551234567");
    await page.getByLabel(/quick note/i).fill("E2E test");
    await page.getByRole("button", { name: /join the waitlist/i }).last().click();

    await expect(page.getByText("You're on the list!")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Something went wrong")).not.toBeVisible();
  });

  test("Partnership form submits successfully", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /brand partnerships/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByLabel(/your name/i).fill("Brand Contact");
    await page.getByLabel(/company/i).fill("Test Beauty Co");
    await page.getByLabel(/email address/i).first().fill("brand@example.com");
    await page.getByLabel(/brand website/i).fill("testbeauty.com");
    await page.getByLabel(/partnership interest/i).fill("E2E test partnership inquiry");
    await page.getByRole("button", { name: /submit inquiry/i }).click();

    await expect(page.getByText("Inquiry Received")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Something went wrong")).not.toBeVisible();
  });

  test("Contact page form submits successfully", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/^name$/i).fill("Contact Tester");
    await page.getByLabel(/email/i).fill("contacttest@example.com");
    await page.getByLabel(/subject/i).fill("Test Inquiry");
    await page.getByLabel(/message/i).fill("This is an automated E2E test message for the contact form");
    await page.getByRole("button", { name: /send inquiry/i }).click();

    await expect(page.getByText("Inquiry Sent")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Error")).not.toBeVisible();
  });
});
