pipeline {
    agent {
        docker { image 'node:16.13.1-alpine'}
    }

    stages {
        stage('Build') {
            steps {
                sh 'cd /var/lib/jenkins/workspace/Teaching_exercise-submitter-web-client'
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm install --no-save --exact jest-watch-typeahead@0.6.5'
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
