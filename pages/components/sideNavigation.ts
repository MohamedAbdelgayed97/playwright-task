import { Locator, Page } from '@playwright/test';

/**
 * Reusable sidebar used across most exercises (Tasks 103–114).
 * One component, many tests — avoids duplicating nav locators.
 */
export class SideNavigation {
  readonly page: Page;
  readonly elementsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementsSection = page.getByRole('heading', { name: 'Elements', exact: true });
  }

  async openRadioButton(): Promise<void> {
    await this.page.getByRole('link', { name: 'Radio Button' }).click();
  }

  async openWebTables(): Promise<void> {
    await this.page.getByRole('link', { name: 'Web Tables' }).click();
  }

  async openButtons(): Promise<void> {
    await this.page.getByRole('link', { name: 'Buttons' }).click();
  }

  async openLinks(): Promise<void> {
    await this.page.getByRole('link', { name: 'Links', exact: true }).click();
  }

  async openUploadAndDownload(): Promise<void> {
    await this.page.getByRole('link', { name: 'Upload and Download', exact: true }).click();
  }

  async openDynamicProperties(): Promise<void> {
    await this.page.getByRole('link', { name: 'Dynamic Properties', exact: true }).click();
  }

  async openPracticeForm(): Promise<void> {
    const formsSection = this.page.getByRole('button', { name: 'Forms' });
    if ((await formsSection.getAttribute('aria-expanded')) !== 'true') {
      await formsSection.click();
    }
    await this.page.getByRole('link', { name: 'Practice Form', exact: true }).click();
  }

  async openAlertsFramesAndWindows(): Promise<void> {
    const alertsFramesAndWindowsSection = this.page.getByRole('button', { name: 'Alerts, Frames & Windows' });
    if ((await alertsFramesAndWindowsSection.getAttribute('aria-expanded')) !== 'true') {
      await alertsFramesAndWindowsSection.click();
    }
  }

  async openBrowserWindows(): Promise<void> {
    await this.page.getByRole('link', { name: 'Browser Windows', exact: true }).click();
  }

  async openWidgets(): Promise<void> {
    const widgetsSection = this.page.getByRole('button', { name: 'Widgets' });
    if ((await widgetsSection.getAttribute('aria-expanded')) !== 'true') {
      await widgetsSection.click();
    }
  }

  async openAutoComplete(): Promise<void> {
    await this.openWidgets();
    await this.page.getByRole('link', { name: 'Auto Complete', exact: true }).click();
  }
}