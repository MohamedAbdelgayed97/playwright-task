import { Locator, Page } from '@playwright/test';

/**
 * Buttons screen (Task 105).
 * Keep this class focused: locators + user actions only (SRP).
 */
export class ButtonsPage {
  readonly page: Page;
  readonly clickMeButton: Locator;
  readonly dynamicClickMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Accessibility-first locator (button name is stable on this page).
    // Note: Playwright matches "Click Me" as substring, so it also matches
    // "Right Click Me" and "Double Click Me". Use exact to avoid strict-mode errors.
    this.clickMeButton = page.getByRole('button', { name: 'Click Me', exact: true });
    this.dynamicClickMessage = page.getByText('You have done a dynamic click');
  }

  async clickDynamicClickMe(): Promise<void> {
    await this.clickMeButton.click();
  }
}

