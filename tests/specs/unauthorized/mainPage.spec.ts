import { test, expect } from '../../fixtures'
import { VIEWPORTS } from '../../utils/viewports'

test.describe('Проверка доступности элементов главной страницы (неавторизованный пользователь)', () => {
  test.describe('Проверки в области Header', () => {
    test('Проверка доступности элементов хедера', async ({ mainPage }) => {
      await mainPage.headerHasCorrectAriaSnapshot()
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
  })

  test.describe('Проверки в области Main', () => {
    test('Проверка доступности элементов табов категорий', async ({ mainPage }) => {
      await mainPage.categoriesTabsHasCorrectAriaSnapshot()
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

      test('Проверка отображения узкого меню при клике на бургер меню', async ({ mainPage }) => {
        await expect(mainPage.wideSideBarMenuLocator).toBeVisible()
        await mainPage.clickBurgerMenu('Закрыть меню навигации')
        await expect(mainPage.narrowSideBarMenuLocator).toBeVisible()
        await expect(mainPage.wideSideBarMenuLocator).not.toBeVisible()
        await mainPage.narrowSideBarMenuHasCorrectAriaSnapshot()
      })
    })

    test.describe('Проверка доступности элементов бокового меню при ширине экрана < 1434px', () => {
      test.beforeEach(async ({ mainPage }) => {
        await mainPage.page.setViewportSize(VIEWPORTS.NARROW)
      })

      test('Проверка отображения узкого меню', async ({ mainPage }) => {
        await expect(mainPage.narrowSideBarMenuLocator).toBeVisible()
        await mainPage.narrowSideBarMenuHasCorrectAriaSnapshot()
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
