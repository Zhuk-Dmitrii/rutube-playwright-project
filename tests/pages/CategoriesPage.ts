import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class CategoriesPage extends BasePage {
  private readonly categoriesContentWrapper: Locator

  constructor(page: Page) {
    super(page)

    this.categoriesContentWrapper = this.page.locator('.categories-module__categories-page')
  }

  async open() {
    await this.page.goto('https://rutube.ru/categories/')
  }
  async categoriesContentWrapperHasCorrectScreenshot() {
    await this.checkScreenshot(this.categoriesContentWrapper, 'categoriesContentWrapper.png')
  }
  async hideHeader() {
    await this.hideElement('.header-module__mainHeader')
  }
}
