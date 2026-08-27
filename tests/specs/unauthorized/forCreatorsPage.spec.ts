import test from '@playwright/test'
import { ForCreatorsPage } from '../../pages/ForCreatorsPage'
import { VIEWPORTS } from '../../utils/viewports'

ForCreatorsPage.creatorPageData.forEach(({ url, testName, fileName }) => {
  test(`Проверка контента страница "для автора" активного таба - ${testName}`, async ({ page }) => {
    const forCreatorPage = new ForCreatorsPage(page)
    await forCreatorPage.openPage(url)
    await forCreatorPage.page.setViewportSize(VIEWPORTS['1920x1080'])
    await forCreatorPage.forCreatorsPageLayoutHasCorrectScreenshot(fileName)
  })
})
