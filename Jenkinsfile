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
