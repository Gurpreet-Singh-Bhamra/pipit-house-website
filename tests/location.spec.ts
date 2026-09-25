import { expect, test } from "@playwright/test";
import { LocationPage } from "./pages/location.page";

test.describe("Location", () => {
  let locationPage: LocationPage;

  test.beforeEach(async ({ page }) => {
    locationPage = new LocationPage(page);
    await locationPage.goto();
  });

  test("shows the location heading", async () => {
    await locationPage.expectHeading();
  });

  test("shows parking and check-in details", async () => {
    await locationPage.expectMainContent();
  });

  test("exposes the booking call to action without completing a booking", async () => {
    await locationPage.expectBookingCta();
  });

  test("follows primary navigation to contact", async ({ page, isMobile }) => {
    if (isMobile) {
      await locationPage.openMobileMenu();
    }
    await locationPage.openNavLink("Contact");
    await expect(page).toHaveURL(/\/contact$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeVisible();
  });
});
