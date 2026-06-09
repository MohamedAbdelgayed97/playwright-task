import { Locator, Page } from '@playwright/test';
import path from 'path';
import type { Gender, PracticeFormRecord } from '../../config/constants';

/**
 * Practice Form screen (Task 109).
 */
export class PracticeFormPage {
  readonly page: Page;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectsInput: Locator;
  readonly pictureInput: Locator;
  readonly addressInput: Locator;
  readonly stateSelect: Locator;
  readonly citySelect: Locator;

  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly otherRadio: Locator;
  
  readonly sportsCheckbox: Locator;
  readonly readingCheckbox: Locator;
  readonly musicCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('#practiceForm');
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.mobileInput = page.locator('#mobile');
    this.dateOfBirthInput = page.locator('#dob');
    this.subjectsInput = page.locator('#subjects');
    this.pictureInput = page.locator('input#picture[type="file"]');
    this.addressInput = page.getByPlaceholder('Currend Address');
    this.stateSelect = page.locator('#state');
    this.citySelect = page.locator('#city');

    const genderRow = this.form.locator('.mb-3.row').filter({ hasText: 'Gender:' });
    this.maleRadio = genderRow.locator('input[type="radio"]').nth(0);
    this.femaleRadio = genderRow.locator('input[type="radio"]').nth(1);
    this.otherRadio = genderRow.locator('input[type="radio"]').nth(2);

    const hobbiesRow = this.form.locator('.mb-3.row').filter({ hasText: 'Hobbies:' });
    this.sportsCheckbox = hobbiesRow.locator('input[type="checkbox"]').nth(0);
    this.readingCheckbox = hobbiesRow.locator('input[type="checkbox"]').nth(1);
    this.musicCheckbox = hobbiesRow.locator('input[type="checkbox"]').nth(2);
  }

  async fillForm(data: PracticeFormRecord): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.selectGender(data.gender);
    await this.mobileInput.fill(data.mobile);
    await this.setDateOfBirthTwoMonthsAgo();
    await this.subjectsInput.fill(data.subjects);
    await this.selectAllHobbies();
    await this.stateSelect.selectOption(data.state);
    await this.citySelect.selectOption(data.city);
    await this.addressInput.fill(data.address);
  }

  async uploadPicture(relativePath: string): Promise<void> {
    const absolutePath = path.resolve(process.cwd(), relativePath);
    await this.pictureInput.setInputFiles(absolutePath);
  }

  async screenshotForm(): Promise<Buffer> {
    return this.form.screenshot();
  }

  private async selectGender(gender: Gender): Promise<void> {
    const genderOptions = {
      Male: this.maleRadio,
      Female: this.femaleRadio,
      Other: this.otherRadio,
    } as const;

    await genderOptions[gender].check();
  }

  private async selectAllHobbies(): Promise<void> {
    await this.sportsCheckbox.check();
    await this.readingCheckbox.check();
    await this.musicCheckbox.check();
    
  }

  private async setDateOfBirthTwoMonthsAgo(): Promise<void> {
    const date = new Date();
    date.setMonth(date.getMonth() - 2);
    const isoDate = date.toISOString().split('T')[0];

    await this.dateOfBirthInput.click();
    await this.dateOfBirthInput.fill(isoDate);
  }
}
