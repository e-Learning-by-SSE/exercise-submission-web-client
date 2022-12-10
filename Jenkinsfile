pipeline {
    agent {
        docker {
            image 'node:19-bullseye'
            label 'project_digitalcampus'
            args '-u root:root'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm ci --force'
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
