def dockerImage

pipeline {
    agent {
        docker {
            image 'node:19-bullseye'
            label 'project_digitalcampus'
            args '-u root:root -v $HOME/.npm:/root/.npm'
            reuseNode true
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
        
        stage('Docker build') {
            agent { label 'docker' }
            steps {
                script {
                    dockerImage = docker.build 'e-learning-by-sse/exercise-submission-web-client'
                }
            }
        }
        
        stage('Publish') {
            agent { label 'docker' }
            steps {
                script {
                    docker.withRegistry('https://ghcr.io', 'e-learning-by-sse') {
                        // TODO api version tag
                        dockerImage.push("latest")
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploy disabled'
            }
        }
    }
}
