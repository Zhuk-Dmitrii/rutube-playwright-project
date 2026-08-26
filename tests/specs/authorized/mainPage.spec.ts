import { test, expect } from '../../fixtures'
import { VIEWPORTS } from '../../utils/viewports'

test.describe('Проверка доступности элементов главной страницы (авторизованный пользователь)', () => {
  test.describe('Проверки в области Header', () => {
    test('Проверка доступности элементов хедера', async ({ mainPage }) => {
      await mainPage.headerHasCorrectAriaSnapshot()
    })

    test('Проверка доступности элементов попапа уведомлений', async ({ mainPage }) => {
      await mainPage.openHeaderNotificationPopup()
      await mainPage.headerNotificationPopupHasCorrectAriaSnapshot()
    })
  })

  test.describe('Проверки в области бокового меню', () => {
    test.describe('Проверка доступности элементов бокового меню при ширине экрана >= 1434px', () => {
      test.beforeEach(async ({ mainPage }) => {
        await mainPage.page.setViewportSize(VIEWPORTS.WIDE)
      })
      test('Проверка отображения широкого меню', async ({ mainPage }) => {
        await expect(mainPage.wideSideBarMenuLocator).toBeVisible()
        await mainPage.wideSideBarMenuHasCorrectAriaSnapshot()
      })
    })

    test.describe('Проверка доступности элементов бокового меню при ширине экрана < 1434px', () => {
      test.beforeEach(async ({ mainPage }) => {
        await mainPage.page.setViewportSize(VIEWPORTS.NARROW)
      })
      test('Проверка отображения широкого меню при клике на бургер меню', async ({ mainPage }) => {
        await expect(mainPage.narrowSideBarMenuLocator).toBeVisible()
        await mainPage.clickBurgerMenu('Открыть меню навигации')
        await expect(mainPage.middleSideBarMenuLocator).toBeVisible()
        await expect(mainPage.narrowSideBarMenuLocator).not.toBeVisible()
        await mainPage.middleSideBarMenuHasCorrectAriaSnapshot()
      })
    })
  })
})
