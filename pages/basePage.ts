import { Page } from '@playwright/test';

/**
 * Shared entry point for the Tutorialspoint practice app.
 * baseURL is set in playwright.config - use relative paths when possible.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.gotoWithRetry('/selenium/practice/text-box.php');
  }

  private async gotoWithRetry(path: string, attempts = 3): Promise<void> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60_000 });
        return;
      } catch (error) {
        lastError = error;
        if (attempt === attempts) {
          break;
        }
        await this.page.waitForTimeout(1_000 * attempt);
      }
    }

    throw lastError;
  }
}