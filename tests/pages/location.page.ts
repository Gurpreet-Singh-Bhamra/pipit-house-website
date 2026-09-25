import { expect, type Locator, type Page } from "@playwright/test";
import { SYKES_BOOKING_URL } from "../../lib/booking";
import { PRIMARY_NAV_LINKS } from "./home.page";

export class LocationPage {
  private readonly page: Page;
  readonly primaryNav: Locator;
  readonly heading: Locator;
  readonly intro: Locator;
  readonly parkingNote: Locator;
  readonly checkInNote: Locator;
  readonly bookingCta: Locator;
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.primaryNav = page.getByRole("navigation", { name: "Primary" });

    this.heading = page.getByRole("heading", {
      level: 1,
      name: "Finding Pipit House",
    });

    this.intro = page
      .getByRole("main")
      .getByText(/You are in Whitby town, on a quieter lane/);

    this.parkingNote = page
      .getByRole("main")
      .getByText(/There is no parking at the cottage itself/);

    this.checkInNote = page
      .getByRole("main")
      .getByText(/Check-in is from 3:30pm, check-out by 10am/);

    this.bookingCta = page
      .getByRole("main")
      .getByRole("link", { name: "Check availability" });

    this.mobileMenuButton = page.getByRole("button", {
      name: /open menu|toggle menu/i,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:3000/location");
    await expect(this.heading).toBeVisible();
  }

  async expectHeading(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async expectMainContent(): Promise<void> {
    await expect(this.intro).toBeVisible();
    await expect(this.parkingNote).toBeVisible();
    await expect(this.checkInNote).toBeVisible();
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
