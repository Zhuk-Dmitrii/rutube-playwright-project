import test from '@playwright/test'
import { MainPage } from '../../pages/MainPage'

test('Открытие главное страницы', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.open()
})
