import { expect, type Locator, type Page } from "@playwright/test";
import { SYKES_BOOKING_URL } from "../../lib/booking";
import { PRIMARY_NAV_LINKS } from "./home.page";

export class CottagePage {
  private readonly page: Page;
  readonly primaryNav: Locator;
  readonly heading: Locator;
  readonly intro: Locator;
  readonly groundFloor: Locator;
  readonly firstFloor: Locator;
  readonly secondFloor: Locator;
  readonly amenities: Locator;
  readonly bookingCta: Locator;
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.primaryNav = page.getByRole("navigation", { name: "Primary" });

    this.heading = page.getByRole("heading", {
      level: 1,
      name: "Inside Pipit House",
    });

    this.intro = page
      .getByRole("main")
      .getByText(/Three floors of a traditional Whitby fisherman.?s cottage/);

    this.groundFloor = page.getByRole("listitem").filter({
      hasText: /Ground floor/,
    });
    this.firstFloor = page.getByRole("listitem").filter({
      hasText: /First floor/,
    });
    this.secondFloor = page.getByRole("listitem").filter({
      hasText: /Second floor/,
    });

    this.amenities = page.getByRole("region", {
      name: /What you.?ll find here/,
    });

    this.bookingCta = page
      .getByRole("main")
      .getByRole("link", { name: "Check availability" });

    this.mobileMenuButton = page.getByRole("button", {
      name: /open menu|toggle menu/i,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:3000/the-cottage");
    await expect(this.heading).toBeVisible();
  }

  async expectHeading(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async expectMainContent(): Promise<void> {
    await expect(this.intro).toBeVisible();
    await expect(this.groundFloor).toBeVisible();
    await expect(this.firstFloor).toBeVisible();
    await expect(this.secondFloor).toBeVisible();
    await expect(this.amenities).toBeVisible();
    await expect(
      this.amenities.getByRole("heading", {
        level: 2,
        name: /What you.?ll find here/,
      }),
    ).toBeVisible();
    await expect(this.amenities.getByText("Sleeps 4", { exact: true })).toBeVisible();
    await expect(
      this.amenities.getByText("Dog friendly", { exact: true }),
    ).toBeVisible();
  }

  async expectBookingCta(): Promise<void> {
    await expect(this.bookingCta).toBeVisible();
    await expect(this.bookingCta).toHaveAttribute("href", SYKES_BOOKING_URL);
    await expect(this.bookingCta).toHaveAttribute("target", "_blank");
  }

  async openNavLink(
    name: (typeof PRIMARY_NAV_LINKS)[number]["name"],
  ): Promise<void> {
    await this.primaryNav.getByRole("link", { name, exact: true }).click();
  }

  async openMobileMenu(): Promise<void> {
    if (await this.mobileMenuButton.isVisible()) {
      await this.mobileMenuButton.click();
    }
  }
}
