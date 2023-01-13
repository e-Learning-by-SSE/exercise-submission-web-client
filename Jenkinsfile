def dockerImage

pipeline {
    agent {
        label 'docker'
    }

    environment {
        DOCKER_TARGET = 'e-learning-by-sse/exercise-submission-web-client'
        DOCKER_REGISTRY = 'https://ghcr.io'
        JENKINS_DOCKER_CREDS = 'github-ssejenkins'
    }
    
    stages {
    
        stage('Prepare NodeJS') {
            agent {
                docker {
                    image 'node:18-bullseye'
                    label 'project_digitalcampus'
                    args '-u root:root -v $HOME/.npm:/root/.npm'
                    reuseNode true
                }
            }
            stages {
                stage('Install Dependencies') {
                    steps {
                        sh 'npm ci --force'
                    }
                }
                stage('Build') {
                    steps {
                        sh 'npm run build'
                    }
                }
                stage ('Tests') {
                    steps {
                        sh 'npm test'
                    }
                }
            }
        }

        
        stage('Docker build') {
            steps {
                script {
                    dockerImage = docker.build 'e-learning-by-sse/exercise-submission-web-client'
                }
            }
        }
        
        stage('Publish') {
            steps {
                script {
                    docker.withRegistry("${DOCKER_REGISTRY}", "${JENKINS_DOCKER_CREDS}") {
                        dockerImage.push("${env.BUILD_NUMBER}")
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
