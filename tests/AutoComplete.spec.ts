import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { SideNavigation } from '../pages/components/sideNavigation';
import { AutoCompletePage } from '../pages/widgets/autoCompletePage';

test.describe('Task 114 - Auto Complete', () => {
  test('should type a and select Haskell from suggestions', async ({ page }) => {
    const basePage = new BasePage(page);
    const sideNav = new SideNavigation(page);
    const autoCompletePage = new AutoCompletePage(page);

    await basePage.open();
    await sideNav.openAutoComplete();
    await autoCompletePage.selectHaskellFromSuggestions();

    await expect(autoCompletePage.tagsInput).toHaveValue('Haskell');
  });
});