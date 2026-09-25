import { expect, test } from "@playwright/test";
import { CottagePage } from "./pages/cottage.page";

test.describe("The Cottage", () => {
  let cottagePage: CottagePage;

  test.beforeEach(async ({ page }) => {
    cottagePage = new CottagePage(page);
    await cottagePage.goto();
  });

  test("shows the cottage heading", async () => {
    await cottagePage.expectHeading();
  });

  test("shows the floor guide and amenities", async () => {
    await cottagePage.expectMainContent();
  });

  test("exposes the booking call to action without completing a booking", async () => {
    await cottagePage.expectBookingCta();
  });

  test("follows primary navigation to location", async ({ page, isMobile }) => {
    if (isMobile) {
      await cottagePage.openMobileMenu();
    }
    await cottagePage.openNavLink("Location");
    await expect(page).toHaveURL(/\/location$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Finding Pipit House" }),
    ).toBeVisible();
  });
});
