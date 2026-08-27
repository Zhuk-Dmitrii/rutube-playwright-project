import { test } from '../../fixtures'

test('Проверка контента страницы категории', async ({ categoriesPage }) => {
  await categoriesPage.hideHeader()
  await categoriesPage.categoriesContentWrapperHasCorrectScreenshot()
})
