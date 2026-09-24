import { test } from "@playwright/test";
import { GalleryPage } from "./pages/gallery.page";

test.describe("Gallery", () => {
  let galleryPage: GalleryPage;

  test.beforeEach(async ({ page }) => {
    galleryPage = new GalleryPage(page);
    await galleryPage.goto();
  });

  test("shows the gallery heading", async () => {
    await galleryPage.expectHeading();
  });

  test("loads every cottage photo thumbnail", async () => {
    await galleryPage.expectAllThumbnailsLoaded();
  });
});
