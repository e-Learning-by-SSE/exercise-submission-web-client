pipeline {
    agent {
        docker {
            image 'node:18.12.1-alpine'
            label 'project_digitalcampus'
         }
    }

    stages {
        stage('Build') {
            steps {
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
