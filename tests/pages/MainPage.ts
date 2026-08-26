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
  private readonly headerUserProfileBtnLocator: Locator
  private readonly headerUserProfileMenuLocator: Locator

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
    this.headerUserProfileBtnLocator = this.headerLocator.getByRole('button', { name: 'Открыть меню пользователя' })
    this.headerUserProfileMenuLocator = this.page.getByRole('dialog', { name: 'Меню пользователя' })
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
  async openUserProfileMenu() {
    await this.headerUserProfileBtnLocator.click()
  }

  // Assertions
  // --- Assertions ==> Snapshots
  async headerHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerLocator, 'headerAriaSnapshot.yml')
  }
  async categoriesTabsHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.categoriesTabsLocator, 'categoriesTabsAriaSnapshot.yml')
  }
  async narrowSideBarMenuHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.narrowSideBarMenuLocator, 'narrowSideBarMenuAriaSnapshot.yml')
  }
  async middleSideBarMenuHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.middleSideBarMenuLocator, 'middleSideBarMenuAriaSnapshot.yml')
  }
  async wideSideBarMenuHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.wideSideBarMenuLocator, 'wideSideBarMenuAriaSnapshot.yml')
  }
  async headerAddDropdownMenuContainerHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerAddDropdownMenuLocator, 'headerAddDropdownMenuContainerAriaSnapshot.yml')
  }
  async headerNotificationPopupHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerNotificationPopupLocator, 'headerNotificationPopupAriaSnapshot.yml')
  }
  async headerDisabledAdsModalHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerDisabledAdsModalLocator, 'headerDisabledAdsModalAriaSnapshot.yml')
  }
  async headerUserProfileMenuHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.headerUserProfileMenuLocator, 'headerUserProfileMenuAriaSnapshot.yml')
  }
  // --- Assertions ==> Visibility
  async headerAddDropdownMenuHasCorrectItems() {
    await expect(
      this.headerAddDropdownMenuLocator.locator('button').filter({ hasText: 'Загрузить видео или Shorts' }),
    ).toBeVisible()
    await expect(
      this.headerAddDropdownMenuLocator.locator('button').filter({ hasText: 'Создать трансляцию' }),
    ).toBeVisible()
  }
}
