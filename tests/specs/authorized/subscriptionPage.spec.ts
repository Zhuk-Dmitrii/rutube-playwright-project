import { test } from '../../fixtures'

test('Проверка доступности элементов страницы подписки (авторизованный пользователь)', async ({ subscriptionPage }) => {
  await subscriptionPage.subscriptionContentWrapperHasCorrectSnapshot()
})
