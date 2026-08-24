import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class MainPage extends BasePage {
  private readonly headerLocator: Locator
  private readonly categoriesTabsLocator: Locator
  public readonly narrowSideBarMenuLocator: Locator
  public readonly middleSideBarMenuLocator: Locator
  public readonly wideSideBarMenuLocator: Locator
  private readonly headerAddBtnLocator: Locator
  private readonly headerNotificationBtnLocator: Locator
  private readonly headerSafeModeBtnLocator: Locator
  private readonly headerDisableAdsBtnLocator: Locator
  private readonly headerLoginBtnLocator: Locator
  private readonly headerAddDropdownMenuLocator: Locator
  private readonly headerNotificationPopupLocator: Locator
  private readonly headerDisabledAdsModalLocator: Locator

  constructor(page: Page) {
    super(page)

    // Хедер
    this.headerLocator = this.page.getByRole('banner')
    this.headerAddBtnLocator = this.headerLocator.getByRole('button', { name: 'Добавить' })
    this.headerNotificationBtnLocator = this.headerLocator.getByRole('button', { name: 'Уведомления' })
    this.headerSafeModeBtnLocator = this.headerLocator.getByRole('button', { name: 'перейти в безопасный режим' })
    this.headerDisableAdsBtnLocator = this.headerLocator.getByRole('button', { name: 'Отключить рекламу' })
    this.headerLoginBtnLocator = this.headerLocator.getByRole('button', { name: 'Вход' })
    this.headerAddDropdownMenuLocator = this.page.getByRole('menu').filter({
      has: this.page.getByText('Загрузить видео или Shorts'),
    })
    this.headerNotificationPopupLocator = this.page
      .getByRole('dialog')
      .locator('.wdp-notifications-popup-module__wrapper')
    this.headerDisabledAdsModalLocator = this.page.getByRole('dialog', { name: 'RUTUBE' })
    // Табы категорий
    this.categoriesTabsLocator = this.page.getByTestId('homepage-navigation')
    // Боковое меню
    this.narrowSideBarMenuLocator = this.page.getByLabel('Облегченная панель навигации')
    this.middleSideBarMenuLocator = this.page.locator(
      'nav.menu-content-module__content.menu-content-module__content--middle',
    )
    this.wideSideBarMenuLocator = this.page.locator(
      'nav.menu-content-module__content.menu-content-module__content--wide',
    )
  }

  // Actions
  async open() {
    await this.page.goto('https://rutube.ru/')
  }
  async clickBurgerMenu(value: 'Открыть меню навигации' | 'Закрыть меню навигации') {
    await this.headerLocator.getByRole('button', { name: value }).click()
  }
  async openHeaderAddDropdownMenu() {
    await this.headerAddBtnLocator.click()
  }
  async openHeaderNotificationPopup() {
    await this.headerNotificationBtnLocator.click()
  }
  async activatedSafeMode() {
    await this.headerSafeModeBtnLocator.click()
  }
  async openHeaderDisabledAdsModal() {
    await this.headerDisableAdsBtnLocator.click()
  }
  async openLoginPage() {
    await this.headerLoginBtnLocator.click()
  }

  // Snapshots
  async headerHasCorrectAriaSnapshot() {
    await expect(this.headerLocator).toMatchAriaSnapshot({ name: 'headerAriaSnapshot.yml' })
  }
  async categoriesTabsHasCorrectAriaSnapshot() {
    await expect(this.categoriesTabsLocator).toMatchAriaSnapshot({ name: 'categoriesTabsAriaSnapshot.yml' })
  }
  async narrowSideBarMenuHasCorrectAriaSnapshot() {
    await expect(this.narrowSideBarMenuLocator).toMatchAriaSnapshot({ name: 'narrowSideBarMenuAriaSnapshot.yml' })
  }
  async middleSideBarMenuHasCorrectAriaSnapshot() {
    await expect(this.middleSideBarMenuLocator).toMatchAriaSnapshot({ name: 'middleSideBarMenuAriaSnapshot.yml' })
  }
  async wideSideBarMenuHasCorrectAriaSnapshot() {
    await expect(this.wideSideBarMenuLocator).toMatchAriaSnapshot({ name: 'wideSideBarMenuAriaSnapshot.yml' })
  }
  async headerAddDropdownMenuContainerHasCorrectAriaSnapshot() {
    await expect(this.headerAddDropdownMenuLocator).toMatchAriaSnapshot({
      name: 'headerAddDropdownMenuContainerAriaSnapshot.yml',
    })
  }
  async headerNotificationPopupHasCorrectAriaSnapshot() {
    await expect(this.headerNotificationPopupLocator).toMatchAriaSnapshot({
      name: 'headerNotificationPopupAriaSnapshot.yml',
    })
  }
  async headerDisabledAdsModalHasCorrectAriaSnapshot() {
    await expect(this.headerDisabledAdsModalLocator).toMatchAriaSnapshot({
      name: 'headerDisabledAdsModalAriaSnapshot.yml',
    })
  }

  // other checks
  async headerAddDropdownMenuHasCorrectItems() {
    await expect(
      this.headerAddDropdownMenuLocator.locator('button').filter({ hasText: 'Загрузить видео или Shorts' }),
    ).toBeVisible()
    await expect(
      this.headerAddDropdownMenuLocator.locator('button').filter({ hasText: 'Создать трансляцию' }),
    ).toBeVisible()
  }
}
