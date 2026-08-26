import { test, expect } from '../../fixtures'

test('Проверка доступности элементов хедера', async ({ mainPage }) => {
  await mainPage.headerHasCorrectAriaSnapshot()
})

test.describe('Проверка доступности элементов бокового меню', () => {
  test('меню при ширине экрана >= 1434px', async ({ mainPage }) => {
    await mainPage.page.setViewportSize({ width: 1434, height: 900 })
    await expect(mainPage.wideSideBarMenuLocator).toBeVisible()
    await mainPage.wideSideBarMenuHasCorrectAriaSnapshot()
  })

  test('меню при ширине экрана < 1434px и клике на бургер меню', async ({ mainPage }) => {
    await mainPage.page.setViewportSize({ width: 1433, height: 900 })
    await expect(mainPage.narrowSideBarMenuLocator).toBeVisible()
    await mainPage.clickBurgerMenu('Открыть меню навигации')
    await expect(mainPage.middleSideBarMenuLocator).toBeVisible()
    await expect(mainPage.narrowSideBarMenuLocator).not.toBeVisible()
    await mainPage.middleSideBarMenuHasCorrectAriaSnapshot()
  })
})

test('Проверка доступности элементов попапа уведомлений', async ({ mainPage }) => {
  await mainPage.openHeaderNotificationPopup()
  await mainPage.headerNotificationPopupHasCorrectAriaSnapshot()
})
