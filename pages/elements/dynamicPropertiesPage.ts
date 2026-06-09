import { Locator, Page } from '@playwright/test';

/**
 * Dynamic Properties screen (Task 108).
 */
export class DynamicPropertiesPage {
  readonly page: Page;
  readonly colorChangeButton: Locator;
  readonly visibleAfterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.colorChangeButton = page.locator('#colorChange');
    this.visibleAfterButton = page.locator('#visibleAfter');
  }

  async clickColorChange(): Promise<void> {
    await this.colorChangeButton.click();
  }
}
