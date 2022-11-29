pipeline {
    agent {
        docker { image 'node:16.13.1-alpine'}
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm cache clear --force'
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
