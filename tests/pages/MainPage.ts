import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class MainPage extends BasePage {
  private readonly headerLocator: Locator
  private readonly categoriesTabsLocator: Locator
  private readonly sidebarMenuLocator: Locator

  constructor(page: Page) {
    super(page)

    this.headerLocator = this.page.getByRole('banner')
    this.categoriesTabsLocator = this.page.getByTestId('homepage-navigation')
    this.sidebarMenuLocator = this.page.getByLabel('Облегченная панель навигации')
  }

  async open() {
    await this.page.goto('https://rutube.ru/')
  }

  async headerHasCorrectAriaSnapshot() {
    await expect(this.headerLocator).toMatchAriaSnapshot()
  }
  async categoriesTabsHasCorrectAriaSnapshot() {
    await expect(this.categoriesTabsLocator).toMatchAriaSnapshot()
  }
  async sidebarMenuHasCorrectAriaSnapshot() {
    await expect(this.sidebarMenuLocator).toMatchAriaSnapshot()
  }
}
