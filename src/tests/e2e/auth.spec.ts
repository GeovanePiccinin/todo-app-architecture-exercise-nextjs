import { test, expect } from "@playwright/test";

test("user can register", async ({ page }) => {
  await page.goto("/register");

  await page.fill("input[name=email]", "test@example.com");
  await page.fill("input[name=password]", "senha123456");

  await page.click("button[type=submit]");

  await expect(page).toHaveURL("/todos");
});
