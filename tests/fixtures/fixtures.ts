import { CategoriesPage } from './../pages/CategoriesPage'
import { test as base } from '@playwright/test'
import { MainPage } from '../pages/MainPage'
import { pagesUrl } from '../utils/pagesUrl'

type MyFixtures = {
  mainPage: MainPage
  categoriesPage: CategoriesPage
}

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page)
    await mainPage.openPage(pagesUrl.mainPage)

    await mainPage.closeAllPopups()

    await use(mainPage)
  },
  categoriesPage: async ({ page }, use) => {
    const categoriesPage = new CategoriesPage(page)
    await categoriesPage.openPage(pagesUrl.categoriesPage)

    await categoriesPage.closeAllPopups()

    await use(categoriesPage)
  },
})

export { expect } from '@playwright/test'
