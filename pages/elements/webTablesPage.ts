import { expect, Locator, Page } from '@playwright/test';
import type { EmployeeRecord } from '../../config/constants';

/**
 * Web Tables screen (Task 104).
 * Actions only — assertions stay in the spec (AAA).
 */
export class WebTablesPage {
  readonly page: Page;
  readonly dataTable: Locator;
  readonly tableBodyRows: Locator;
  readonly addRecordButton: Locator;
  readonly registrationModal: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dataTable = page.locator('.bd-example.table-responsive table');
    this.tableBodyRows = this.dataTable.locator('tbody tr');
    this.addRecordButton = page.getByRole('button', { name: 'Add' });
    this.registrationModal = page.locator('#staticBackdropLive');

    // Scope to the Add modal — Edit modal reuses similar field ids.
    this.firstNameInput = this.registrationModal.locator('#firstname');
    this.lastNameInput = this.registrationModal.locator('#lastname');
    this.emailInput = this.registrationModal.locator('#email');
    this.ageInput = this.registrationModal.locator('#age');
    this.salaryInput = this.registrationModal.locator('#salary');
    // Site typo: id is "deparment", not "department".
    this.departmentInput = this.registrationModal.locator('#deparment');
    this.submitButton = this.registrationModal.locator('input[type="submit"]');
  }

  async openAddRecordModal(): Promise<void> {
    await this.addRecordButton.click();
    await this.registrationModal.waitFor({ state: 'visible' });
  }

  async fillRegistrationForm(record: EmployeeRecord): Promise<void> {
    await this.firstNameInput.fill(record.firstName);
    await this.lastNameInput.fill(record.lastName);
    await this.emailInput.fill(record.email);
    await this.ageInput.fill(record.age);
    await this.salaryInput.fill(record.salary);
    await this.departmentInput.fill(record.department);
  }

  async submitRegistration(): Promise<void> {
    await this.submitButton.click();
    await expect(this.registrationModal).toBeHidden();
  }

  async screenshotRegistrationForm(): Promise<Buffer> {
    return this.registrationModal.screenshot();
  }

  /** Deletes every row via the per-row trash icon (no bulk-delete on this site). */
  async deleteAllRecords(): Promise<void> {
    const deleteLink = this.dataTable.locator('a.confirmdeletebtn');

    while ((await this.tableBodyRows.count()) > 0) {
      const rowCount = await this.tableBodyRows.count();
      await deleteLink.first().click();
      await expect(this.tableBodyRows).toHaveCount(rowCount - 1);
    }
  }
}
