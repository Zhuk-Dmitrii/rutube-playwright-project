import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class SubscriptionPage extends BasePage {
  private readonly subscriptionContentWrapper: Locator

  constructor(page: Page) {
    super(page)

    this.subscriptionContentWrapper = this.page.locator('#app-constraint-container')
  }

  async subscriptionContentWrapperHasCorrectSnapshot() {
    await this.checkAriaSnapshot(this.subscriptionContentWrapper, 'subscriptionContentWrapperAriaSnapshot.yml')
  }
}
