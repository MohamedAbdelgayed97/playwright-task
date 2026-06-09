import { expect, Locator, Page } from '@playwright/test';

export class BrowserWindows {
  readonly page: Page;
  readonly newTabButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTabButton = page.getByRole('button', { name: 'New Tab' });
  }

  async openNewTab(): Promise<Page> {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.newTabButton.click(),
    ]);
    await newPage.waitForLoadState('load');
    return newPage;
  }

  async verifyNewTabLabel(newPage: Page): Promise<void> {
    await expect(newPage.locator('main')).toContainText('Sample New Tab', { timeout: 5000 });
  }
}