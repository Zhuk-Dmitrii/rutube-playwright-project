import { test, expect } from '../../fixtures'

test('Проверка доступности элементов хедера', async ({ mainPage }) => {
  await mainPage.headerHasCorrectAriaSnapshot()
})

test('Проверка доступности элементов табов категорий', async ({ mainPage }) => {
  await mainPage.categoriesTabsHasCorrectAriaSnapshot()
})

test.describe('Проверка доступности элементов бокового меню', () => {
  test('меню при ширине экрана >= 1434px', async ({ mainPage }) => {
    await mainPage.page.setViewportSize({ width: 1434, height: 900 })
    await expect(mainPage.wideSideBarMenuLocator).toBeVisible()
    await mainPage.wideSideBarMenuHasCorrectAriaSnapshot()
  })

  test('меню при ширине экрана >= 1434px и клике на бургер меню', async ({ mainPage }) => {
    await mainPage.page.setViewportSize({ width: 1434, height: 900 })
    await expect(mainPage.wideSideBarMenuLocator).toBeVisible()
    await mainPage.clickBurgerMenu('Закрыть меню навигации')
    await expect(mainPage.narrowSideBarMenuLocator).toBeVisible()
    await expect(mainPage.wideSideBarMenuLocator).not.toBeVisible()
    await mainPage.narrowSideBarMenuHasCorrectAriaSnapshot()
  })

  test('меню при ширине экрана < 1434px', async ({ mainPage }) => {
    await mainPage.page.setViewportSize({ width: 1433, height: 900 })
    await expect(mainPage.narrowSideBarMenuLocator).toBeVisible()
    await mainPage.narrowSideBarMenuHasCorrectAriaSnapshot()
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

test('Проверка доступности элементов выпадающего меню добавления контента', async ({ mainPage }) => {
  await mainPage.openHeaderAddDropdownMenu()
  await mainPage.headerAddDropdownMenuContainerHasCorrectAriaSnapshot()
  await mainPage.headerAddDropdownMenuHasCorrectItems()
})

test('Проверка доступности элементов попапа уведомлений', async ({ mainPage }) => {
  await mainPage.openHeaderNotificationPopup()
  await mainPage.headerNotificationPopupHasCorrectAriaSnapshot()
})

test('Проверка доступности элементов модального окна отключения рекламы', async ({ mainPage }) => {
  await mainPage.openHeaderDisabledAdsModal()
  await mainPage.headerDisabledAdsModalHasCorrectAriaSnapshot()
  await expect(mainPage.page).toHaveURL('https://rutube.ru/?popup=premium_product_ad_flow&productCode=RUTUBE')
})
