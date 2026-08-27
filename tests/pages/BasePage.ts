import { expect, Locator, Page } from '@playwright/test'

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Вспомогательный метод – кликает по локатору, только если он видим
  private async clickIfVisible(locator: Locator, timeout = 10000) {
    try {
      await locator.waitFor({ state: 'visible', timeout })
      await locator.click()
    } catch {}
  }

  // Вспомогательный метод - проверяет snapshot
  protected async checkAriaSnapshot(locator: Locator, fileName: string) {
    await expect(locator).toMatchAriaSnapshot({ name: fileName })
  }
  // Вспомогательный метод - проверяет screenshot
  protected async checkScreenshot(locator: Locator, fileName: string) {
    await expect(locator).toHaveScreenshot(fileName)
  }
  // Вспомогательный метод - скрывает DOM элемент
  protected async hideElement(selector: string) {
    await this.page.evaluate(selector => {
      const headerElement = document.querySelector(selector) as HTMLElement | null
      if (headerElement) {
        headerElement.style.display = 'none'
      }
    }, selector)
  }
  // Вспомогательный метод - закрывает модальное окно подписки
  async closeModalSubscribe() {
    const closeBtn = this.page.getByRole('button', { name: 'Закрыть попап' })
    await this.clickIfVisible(closeBtn)
  }
  // Вспомогательный метод - закрывает попап с уведомлением
  async closeNotificationPopup() {
    const notificationList = this.page.getByLabel('список оповещений')
    const notificationItemBtnClose = notificationList.getByRole('button', { name: 'закрыть' })
    await this.clickIfVisible(notificationItemBtnClose)
  }
  // Вспомогательный метод - закрывает окно с куками
  async closeCookiesPopup() {
    const cookiesItemContainer = this.page.getByRole('complementary')
    const cookiesBtnConfirm = cookiesItemContainer.getByRole('button', { name: 'Ок', exact: true })
    await this.clickIfVisible(cookiesBtnConfirm)
  }
  // Вспомогательный метод - закрывает все попапы/уведомления
  async closeAllPopups() {
    await this.closeModalSubscribe()
    await this.closeNotificationPopup()
    await this.closeCookiesPopup()
  }
}
