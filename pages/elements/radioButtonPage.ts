import { Locator, Page } from '@playwright/test';

/**
 * Radio Button screen — actions and locators only (no assertions).
 * SRP: describes HOW to interact with this page, not WHAT to verify.
 */
export class RadioButtonPage {
  readonly page: Page;
  readonly impressiveRadio: Locator;
  readonly resultMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Site labels use for="" — no accessible name on the radio. Scope by visible text instead.
    this.impressiveRadio = page
      .locator('.form-check-inline')
      .filter({ hasText: 'Impressive' })
      .locator('input[type="radio"]');
    this.resultMessage = page.locator('#check1');
  }

  async selectImpressive(): Promise<void> {
    await this.impressiveRadio.check();
  }
}
