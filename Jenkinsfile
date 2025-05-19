pipeline {
    agent {
        docker {
            image 'playwright-login-form' // Use a specific version
            // args '-u root' // If you needed to run something as root inside this specific container, but usually not needed for Playwright itself.
        }
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