import { Locator, Page } from '@playwright/test';

export class LinksPage {
    readonly page: Page;
    readonly NotFoundLink: Locator;
    readonly notFoundLinkMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.NotFoundLink = page.getByRole('link', { name: 'Not Found', exact: true });
        // Message lives in a hidden div toggled by JS; text includes <b> tags so avoid :text-is.
        this.notFoundLinkMessage = page.locator('.nfound');
    }
    async clickNotFoundLink(): Promise<void> {
        await this.NotFoundLink.click();
    }
   

}   