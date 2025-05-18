pipeline {
    agent any // Runs on any available agent (master by default in a simple setup)

    tools {
        nodejs 'NodeJS-24' // Matches the NodeJS installation name configured in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Coolb0x/playwright-login-form' // Replace with your repo URL
                // If your repository is private, you'll need to configure credentials in Jenkins
                // and use: checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                // userRemoteConfigs: [[credentialsId: 'YOUR_JENKINS_CREDENTIAL_ID', url: 'YOUR_GITHUB_REPOSITORY_URL']]])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // 'npm ci' is generally preferred for CI for clean installs
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // --with-deps installs necessary OS dependencies for headless browsers
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
            // Publish JUnit test results
            junit 'test-results/junit-results.xml'

            // Publish Playwright HTML report
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            // Clean up workspace
            // cleanWs() // Optional: cleans the workspace after the build
        }
    }
}