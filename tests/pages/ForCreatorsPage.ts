import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { pagesUrl } from '../utils/pagesUrl'

export class ForCreatorsPage extends BasePage {
  static creatorPageData = [
    {
      url: pagesUrl.forCreatorsPage.main,
      fileName: 'forCreatorsMainPage.png',
      testName: 'main',
    },
    {
      url: pagesUrl.forCreatorsPage.steps,
      fileName: 'forCreatorsStepPage.png',
      testName: 'steps',
    },
    {
      url: pagesUrl.forCreatorsPage.faq,
      fileName: 'forCreatorsFaqPage.png',
      testName: 'faq',
    },
    {
      url: pagesUrl.forCreatorsPage.monetization,
      fileName: 'forCreatorsMonetizationPage.png',
      testName: 'monetization',
    },
    {
      url: pagesUrl.forCreatorsPage.rules,
      fileName: 'forCreatorsRulesPage.png',
      testName: 'rules',
    },
    {
      url: pagesUrl.forCreatorsPage.academy,
      fileName: 'forCreatorsAcademyPage.png',
      testName: 'academy',
    },
    {
      url: pagesUrl.forCreatorsPage.grades,
      fileName: 'forCreatorsGradesPage.png',
      testName: 'grades',
    },
  ]
  private readonly forCreatorsPageLayout: Locator
  private readonly layoutLoader: Locator
  private readonly iframe: Locator

  constructor(page: Page) {
    super(page)
    this.forCreatorsPageLayout = this.page.locator('#___gatsby')
    this.iframe = this.page.locator('iframe[title="embed"]')
    this.layoutLoader = this.page.frameLocator('iframe[title="embed"]').getByTestId('layout-loader')
  }

  private async waitForPlayVideoBtn() {
    const iframeCount = await this.iframe.count()
    if (!iframeCount) return

    await this.layoutLoader.waitFor({ state: 'visible', timeout: 10000 })
  }

  async forCreatorsPageLayoutHasCorrectScreenshot(fileName: string) {
    await this.waitForPlayVideoBtn()
    await this.checkScreenshot(this.forCreatorsPageLayout, fileName, 10000)
  }
}
