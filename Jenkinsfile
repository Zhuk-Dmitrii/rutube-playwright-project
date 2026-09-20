pipeline {
    // 1. Говорим Jenkins использовать официальный образ Playwright (как в вашем github-actions)
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.63.0-noble'
            // Флаг -u root нужен, чтобы у контейнера были права на запись артефактов
            args '-u root'
        }
    }

    environment {
        // Передаём переменную CI, как это было в github actions
        CI = 'true'
        // Сюда можно добавить ваш EMAIL, если он нужен для тестов
        // EMAIL = credentials('EMAIL')  // Об этом позже
    }

    stages {
        // Этап 1: Установка зависимостей (аналог npm ci в github actions)
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        // Этап 2: Восстановление состояния аутентификации (аналог вашего шага Restore auth)
        stage('Restore Auth State') {
            steps {
                sh '''
                    mkdir -p tests/playwright/.auth
                    echo "$AUTH_STORAGE_STATE" | base64 -d > tests/playwright/.auth/user.json
                '''
            }
            environment {
                AUTH_STORAGE_STATE = credentials('AUTH_STORAGE_STATE')
            }
        }

        // Этап 3: Запуск тестов (аналог npx playwright test)
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        // Действия после завершения (всегда, даже если тесты упали)
        always {
            // Публикуем JUnit отчет, если вы настроили его в playwright.config.ts
            junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
            
            // Сохраняем артефакты (отчеты, скриншоты, видео) как в github actions
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
        // Очистка рабочей области после завершения
        cleanup {
            cleanWs()
        }
    }
}