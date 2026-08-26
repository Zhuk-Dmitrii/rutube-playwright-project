import { test as setup } from '../fixtures'
import path from 'path'

const authFile = path.join(__dirname, '../playwright/.auth/user.json')

setup('Авторизация пользователя', async ({ mainPage }) => {
  const page = mainPage.page

  await page.goto('https://rutube.ru/')
  await page.getByRole('button', { name: 'Вход' }).click()

  await page.getByTestId('Email-Tab-Item').click()
  await page.getByTestId('email-input').fill(process.env.EMAIL as string)
  await page.getByTestId('next-btn').click()

  await page.pause() // <-- Здесь вы вводите капчу вручную и нажимаете кнопку

  // Ждем появления поля для ввода кода после успешной отправки капчи
  const otpInput = page.getByTestId('otp-email')
  await otpInput.waitFor({ state: 'visible', timeout: 30000 })

  await page.pause() // <-- Здесь вы вводите код отправленный на почту

  await page.getByRole('button', { name: 'Открыть меню пользователя' }).click()
  await page.getByRole('link', { name: 'Профиль', exact: true }).click()

  await page.context().storageState({ path: authFile })
})
