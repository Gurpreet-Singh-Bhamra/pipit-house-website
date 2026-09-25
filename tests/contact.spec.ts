import { expect, test } from "@playwright/test";
import { ContactPage } from "./pages/contact.page";

test.describe("Contact", () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test("shows the contact heading", async () => {
    await contactPage.expectHeading();
  });

  test("shows how to reach the hosts through Sykes", async () => {
    await contactPage.expectMainContent();
  });

  test("exposes the booking call to action without completing a booking", async () => {
    await contactPage.expectBookingCta();
  });

  test("follows primary navigation to the cottage", async ({ page, isMobile }) => {
    if (isMobile) {
      await contactPage.openMobileMenu();
    }
    await contactPage.openNavLink("The Cottage");
    await expect(page).toHaveURL(/\/the-cottage$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Inside Pipit House" }),
    ).toBeVisible();
  });

  test("follows footer navigation to local events", async ({ page }) => {
    await contactPage.openFooterLink("Local Events");
    await expect(page).toHaveURL(/\/blog$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Local events" }),
    ).toBeVisible();
  });
});
