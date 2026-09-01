import { test } from '../../fixtures'

test('Проверка контента страницы категории @screenshot', async ({ categoriesPage }) => {
  await categoriesPage.hideHeader()
  await categoriesPage.categoriesContentWrapperHasCorrectScreenshot()
})
