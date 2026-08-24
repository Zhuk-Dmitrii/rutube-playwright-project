import { test, expect } from '../../fixtures'

test('Проверка доступности элементов хедера', async ({ mainPage }) => {
  await mainPage.headerHasCorrectAriaSnapshot()
})

test('Проверка доступности элементов табов категорий', async ({ mainPage }) => {
  await mainPage.categoriesTabsHasCorrectAriaSnapshot()
})

test('Проверка доступности элементов бокового меню', async ({ mainPage }) => {
  await mainPage.sidebarMenuHasCorrectAriaSnapshot()
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
