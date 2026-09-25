import { expect, test } from "@playwright/test";
import { EventsPage } from "./pages/events.page";

test.describe("Local Events", () => {
  let eventsPage: EventsPage;

  test.beforeEach(async ({ page }) => {
    eventsPage = new EventsPage(page);
    await eventsPage.goto();
  });

  test("shows the events heading", async () => {
    await eventsPage.expectHeading();
  });

  test("shows the events intro and catalog", async () => {
    await eventsPage.expectMainContent();
  });

  test("exposes the booking call to action without completing a booking", async () => {
    await eventsPage.expectBookingCta();
  });

  test("follows primary navigation to the gallery", async ({ page, isMobile }) => {
    if (isMobile) {
      await eventsPage.openMobileMenu();
    }
    await eventsPage.openNavLink("Gallery");
    await expect(page).toHaveURL(/\/gallery$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Life at Pipit House" }),
    ).toBeVisible();
  });
});
