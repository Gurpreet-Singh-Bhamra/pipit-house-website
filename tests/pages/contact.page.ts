import { expect, type Locator, type Page } from "@playwright/test";
import { SYKES_BOOKING_URL } from "../../lib/booking";
import { PRIMARY_NAV_LINKS } from "./home.page";

export class ContactPage {
  private readonly page: Page;
  readonly primaryNav: Locator;
  readonly heading: Locator;
  readonly intro: Locator;
  readonly bookingCta: Locator;
  readonly footerNav: Locator;
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.primaryNav = page.getByRole("navigation", { name: "Primary" });

    this.heading = page.getByRole("heading", {
      level: 1,
      name: "Contact",
    });

    this.intro = page
      .getByRole("main")
      .getByText(/For dates and bookings, use the Sykes listing/);

    this.bookingCta = page
      .getByRole("main")
      .getByRole("link", { name: "Check availability" });

    this.footerNav = page.getByRole("navigation", { name: "Footer" });

    this.mobileMenuButton = page.getByRole("button", {
      name: /open menu|toggle menu/i,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:3000/contact");
    await expect(this.heading).toBeVisible();
  }

  async expectHeading(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async expectMainContent(): Promise<void> {
    await expect(this.intro).toBeVisible();
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

  async openFooterLink(name: "Local Events" | "Contact"): Promise<void> {
    await this.footerNav.getByRole("link", { name, exact: true }).click();
  }

  async openMobileMenu(): Promise<void> {
    if (await this.mobileMenuButton.isVisible()) {
      await this.mobileMenuButton.click();
    }
  }
}
