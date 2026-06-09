import { Locator, Page } from '@playwright/test';
import path from 'path';

/**
 * Upload and Download screen (Task 107).
 */
export class UploadDownloadPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly uploadSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('#uploadFile');
    this.uploadSection = page.locator('.form-file');
  }
    // Use the process.cwd() to get the current working directory
    // and then use the path.resolve() to get the absolute path of the file
    // and then use the setInputFiles() to upload the file
    // and then use the screenshot() to screenshot the upload section
  async uploadFile(relativePath: string): Promise<void> {
    const absolutePath = path.resolve(process.cwd(), relativePath);
    await this.fileInput.setInputFiles(absolutePath);
  }

  async screenshotUploadSection(): Promise<Buffer> {
    return this.uploadSection.screenshot();
  }
}
