import { expect, type Locator, type Page } from "@playwright/test";
import { SYKES_BOOKING_URL } from "../../lib/booking";
import { PRIMARY_NAV_LINKS } from "./home.page";

export class EventsPage {
  private readonly page: Page;
  readonly primaryNav: Locator;
  readonly heading: Locator;
  readonly intro: Locator;
  readonly lastUpdated: Locator;
  readonly eventArticles: Locator;
  readonly emptyState: Locator;
  readonly bookingCta: Locator;
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.primaryNav = page.getByRole("navigation", { name: "Primary" });

    this.heading = page.getByRole("heading", {
      level: 1,
      name: "Local events",
    });

    this.intro = page.getByRole("main").getByText(
      /Festivals, the regatta, and the odd icy dip/,
    );

    this.lastUpdated = page.getByRole("main").getByText(/Last updated /);

    this.eventArticles = page.getByRole("main").getByRole("article");

    this.emptyState = page
      .getByRole("main")
      .getByText(/No upcoming listings in the current window/);

    this.bookingCta = page
      .getByRole("main")
      .getByRole("link", { name: "Check availability" });

    this.mobileMenuButton = page.getByRole("button", {
      name: /open menu|toggle menu/i,
    });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:3000/blog");
    await expect(this.heading).toBeVisible();
  }

  async expectHeading(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async expectMainContent(): Promise<void> {
    await expect(this.intro).toBeVisible();
    await expect(this.lastUpdated).toBeVisible();

    const articleCount = await this.eventArticles.count();
    if (articleCount === 0) {
      await expect(this.emptyState).toBeVisible();
      return;
    }

    await expect(this.eventArticles.first()).toBeVisible();
    await expect(
      this.eventArticles.first().getByRole("heading", { level: 2 }),
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
