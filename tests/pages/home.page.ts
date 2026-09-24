import { expect, type Locator, type Page } from "@playwright/test";
import { SYKES_BOOKING_URL } from "../../lib/booking";

export const PRIMARY_NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "The Cottage", href: "/the-cottage" },
  { name: "Gallery", href: "/gallery" },
  { name: "Local Events", href: "/blog" },
  { name: "Location", href: "/location" },
  { name: "Contact", href: "/contact" },
] as const;

export class HomePage {
  private readonly page: Page;
  readonly primaryNav: Locator;
  readonly heroHeading: Locator;
  readonly mainCta: Locator;
  readonly mobileMenuButton: Locator;
  readonly mobileNav: Locator;

  constructor(page: Page) {
    this.page = page;

    this.primaryNav = page.getByRole("navigation", {
      name: "Primary",
    });

    this.heroHeading = page.getByRole("heading", {
      level: 1,
      name: /Pipit House — a fisherman.?s cottage by the Esk/,
    });

    this.mainCta = page
      .getByRole("main")
      .getByRole("link", { name: "Check availability" })
      .first();

    this.mobileMenuButton = page.getByRole("button", {
      name: /open menu|toggle menu/i,
    });
    this.mobileNav = page.getByRole("navigation", { name: "Primary" });
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:3000/");
  }

  async expectHeroHeading(): Promise<void> {
    await expect(this.heroHeading).toBeVisible();
  }

  async expectPrimaryNavLinks(): Promise<void> {
    for (const link of PRIMARY_NAV_LINKS) {
      await expect(
        this.primaryNav.getByRole("link", { name: link.name, exact: true }),
      ).toHaveAttribute("href", link.href);
    }
  }

  async openNavLink(name: (typeof PRIMARY_NAV_LINKS)[number]["name"]): Promise<void> {
    await this.primaryNav.getByRole("link", { name, exact: true }).click();
  }

  async expectMainCta(): Promise<void> {
    await expect(this.mainCta).toBeVisible();
    await expect(this.mainCta).toHaveAttribute("href", SYKES_BOOKING_URL);
    await expect(this.mainCta).toHaveAttribute("target", "_blank");
  }

  async expectBookingButton(): Promise<void> {
    await expect(
      this.page.getByRole("heading", { name: "Where you will be" }),
    ).toBeVisible();
    await expect(
      this.page
        .getByRole("main")
        .getByRole("link", { name: "Check availability", exact: true })
        .last(),
    ).toBeVisible();
  }

  async openMobileMenu(): Promise<void> {
    if (await this.mobileMenuButton.isVisible()) {
      await this.mobileMenuButton.click();
    }
  }
}
