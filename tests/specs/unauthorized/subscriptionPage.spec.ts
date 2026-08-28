import { test } from '../../fixtures'

test('Проверка доступности элементов страницы подписки (не авторизованный пользователь)', async ({
  subscriptionPage,
}) => {
  await subscriptionPage.subscriptionContentWrapperHasCorrectSnapshot()
})
