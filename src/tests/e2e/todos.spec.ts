import { test, expect } from "@playwright/test";

test("user can create todo", async ({ page }) => {
  await page.goto("/todos");

  await page.fill("input[placeholder='add a new todo']", "Test Todo");

  await page.keyboard.press("Enter");

  await expect(page.getByText("Test Todo")).toBeVisible();
});
