import { expect, Locator, Page } from '@playwright/test';

/**
 * Auto Complete screen (Task 114).
 */
export class AutoCompletePage {
  readonly page: Page;
  readonly tagsInput: Locator;
  readonly haskellOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tagsInput = page.locator('#tags');
    this.haskellOption = page.locator('.ui-menu-item', { hasText: 'Haskell' });
  }

  async selectHaskellFromSuggestions(): Promise<void> {
    await this.tagsInput.fill('a');
    await expect(this.haskellOption).toBeVisible();
    await this.haskellOption.click();
  }
}