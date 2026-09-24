import { expect, test } from "@playwright/test";
import { HomePage, PRIMARY_NAV_LINKS } from "./pages/home.page";

test.describe("Homepage", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("shows the hero heading", async () => {
    await homePage.expectHeroHeading();
  });

  test("lists primary navigation links to the public routes", async () => {
    await homePage.expectPrimaryNavLinks();
    await homePage.expectBookingButton();
  });

  test("follows primary navigation to the gallery", async ({ page }) => {
    await homePage.openNavLink("Gallery");
    await expect(page).toHaveURL(/\/gallery$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Life at Pipit House" }),
    ).toBeVisible();
  });

  test("exposes the main booking call to action without completing a booking", async () => {
    await homePage.expectMainCta();
  });
});

test.describe("Homepage primary nav destinations", () => {
  for (const link of PRIMARY_NAV_LINKS.filter((item) => item.href !== "/")) {
    test(`opens ${link.name} from the header`, async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      await homePage.openNavLink(link.name);
      await expect(page).toHaveURL(new RegExp(`${link.href}$`));
    });
  }

});