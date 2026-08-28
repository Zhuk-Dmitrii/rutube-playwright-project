import { test as base } from '@playwright/test'
import { pagesUrl } from '../utils/pagesUrl'
import { CategoriesPage, MainPage, SubscriptionPage } from '../pages'

type MyFixtures = {
  mainPage: MainPage
  categoriesPage: CategoriesPage
  subscriptionPage: SubscriptionPage
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
  subscriptionPage: async ({ page }, use) => {
    const subscriptionPage = new SubscriptionPage(page)
    await subscriptionPage.openPage(pagesUrl.subscriptionPage)
    await subscriptionPage.closeAllPopups()

    await use(subscriptionPage)
  },
})

export { expect } from '@playwright/test'
