import { Locator, Page } from '@playwright/test'

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Вспомогательный метод – кликает по локатору, только если он видим
  private async clickIfVisible(locator: Locator, timeout = 1000) {
    try {
      const isVisible = await locator.isVisible({ timeout })
      if (isVisible) {
        await locator.click()
      }
    } catch {}
  }

  async closeModalSubscribe() {
    const closeBtn = this.page.getByRole('button', { name: 'Закрыть попап' })
    await this.clickIfVisible(closeBtn)
  }

  async closeNotificationPopup() {
    const notificationList = this.page.getByLabel('список оповещений')
    const notificationItemBtnClose = notificationList.getByRole('button', { name: 'закрыть' })
    await this.clickIfVisible(notificationItemBtnClose)
  }

  async closeCookiesPopup() {
    const cookiesItemContainer = this.page.getByRole('complementary')
    const cookiesBtnConfirm = cookiesItemContainer.getByRole('button', { name: 'Ок', exact: true })
    await this.clickIfVisible(cookiesBtnConfirm)
  }
}
