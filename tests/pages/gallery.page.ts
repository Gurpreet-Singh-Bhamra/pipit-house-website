import { expect, type Locator, type Page } from "@playwright/test";
import { GALLERY_PHOTOS } from "../../lib/gallery";

export class GalleryPage {
  private readonly page: Page;
  readonly heading: Locator;
  readonly thumbnailImages: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole("heading", {
      level: 1,
      name: "Life at Pipit House",
    });

    this.thumbnailImages = page.getByRole("main").getByRole("img");
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:3000/gallery", {
      waitUntil: "domcontentloaded",
    });
    await expect(this.heading).toBeVisible();
    await expect
      .poll(async () => {
        const box = await this.thumbnailImages.first().boundingBox();
        return box?.width ?? 0;
      })
      .toBeLessThan(500);
  }

  async expectHeading(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async expectAllThumbnailsLoaded(): Promise<void> {
    await expect(this.thumbnailImages).toHaveCount(GALLERY_PHOTOS.length);

    for (const photo of GALLERY_PHOTOS) {
      const image = this.page.getByRole("img", {
        name: photo.alt,
        exact: true,
      });

      await image.scrollIntoViewIfNeeded();
      await expect(image, `Missing thumbnail: ${photo.slug}`).toBeVisible();
      await expect(image).toHaveAttribute("src", new RegExp(photo.slug));

      const srcset = await image.getAttribute("srcset");
      const candidate = srcset?.split(",")[0]?.trim().split(/\s+/)[0];
      if (!candidate) {
        throw new Error(`Thumbnail ${photo.slug} has no srcset candidate`);
      }

      const response = await this.page.request.get(
        new URL(candidate, "http://localhost:3000").href,
      );
      expect(
        response.ok(),
        `Thumbnail ${photo.slug} returned ${String(response.status())}`,
      ).toBeTruthy();
    }
  }
}
