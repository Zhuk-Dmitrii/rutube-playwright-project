import test from '@playwright/test'
import { MainPage } from '../../pages/MainPage'

test('Открытие главное страницы', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.open()
})

test('Проверка доступности элементов хедера', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.open()
  await mainPage.closeModalSubscribe()
  await mainPage.closeNotificationPopup()
  await mainPage.closeCookiesPopup()
  await mainPage.headerHasCorrectAriaSnapshot()
})

test('Проверка доступности элементов табов категорий', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.open()
  await mainPage.closeModalSubscribe()
  await mainPage.closeNotificationPopup()
  await mainPage.closeCookiesPopup()
  await mainPage.categoriesTabsHasCorrectAriaSnapshot()
})

test('Проверка доступности элементов бокового меню', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.open()
  await mainPage.closeModalSubscribe()
  await mainPage.closeNotificationPopup()
  await mainPage.closeCookiesPopup()
  await mainPage.sidebarMenuHasCorrectAriaSnapshot()
})
