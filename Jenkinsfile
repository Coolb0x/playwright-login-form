pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.44.0-jammy' // Use a specific version
            // args '-u root' // If you needed to run something as root inside this specific container, but usually not needed for Playwright itself.
        }
    }

    tools {
        nodejs 'NodeJS-18' // Still useful for npm/npx commands if not globally installed in the agent image
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Coolb0x/playwright-login-form'
                // Add credentials if private
            }
        }

        stage('Install Project Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        // Playwright browsers and most OS deps are already in mcr.microsoft.com/playwright image
        // You might only need to run `npx playwright install` if you want to ensure
        // exact browser versions tied to your project's playwright version, or if they aren't bundled.
        // However, these images usually come with browsers pre-installed.
        // The playwright install --with-deps might be very fast or not needed for OS deps.
        stage('Install/Verify Playwright Browsers (if needed)') {
            steps {
                // This ensures browsers match your Playwright version
                // The --with-deps part might be redundant here for system libs.
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            junit 'test-results/junit-results.xml'
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}