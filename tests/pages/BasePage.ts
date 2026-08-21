import { Page } from '@playwright/test'

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async closeModalSubscribe() {
    await this.page.getByRole('button', { name: 'Закрыть попап' }).click()
  }

  async closeNotificationPopup() {
    const notificationList = this.page.getByLabel('список оповещений')
    const notificationItemBtnClose = notificationList.getByRole('button', { name: 'закрыть' })
    await notificationItemBtnClose.click()
  }

  async closeCookiesPopup() {
    const cookiesItemContainer = this.page.getByRole('complementary')
    const cookiesBtnConfirm = cookiesItemContainer.getByRole('button', { name: 'Ок', exact: true })
    await cookiesBtnConfirm.click()
  }
}
