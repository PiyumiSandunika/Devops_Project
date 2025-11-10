pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKER_HUB_USERNAME = 'piyumi00'
        BACKEND_IMAGE = 'devops_project_backend'
        FRONTEND_IMAGE = 'devops_project_frontend'
        GITHUB_REPO = 'https://github.com/PiyumiSandunika/Devops_Project.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: "${GITHUB_REPO}"
            }
        }

        stage('Build Backend Image') {
            steps {
                echo 'Building backend Docker image...'
                sh '''
                    docker build -t ${BACKEND_IMAGE} ${GITHUB_REPO}#main:workshop-backend
                    docker tag ${BACKEND_IMAGE} ${DOCKER_HUB_USERNAME}/${BACKEND_IMAGE}:latest
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building frontend Docker image...'
                sh '''
                    docker build -t ${FRONTEND_IMAGE} ${GITHUB_REPO}#main:frontend
                    docker tag ${FRONTEND_IMAGE} ${DOCKER_HUB_USERNAME}/${FRONTEND_IMAGE}:latest
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub...'
                sh 'echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo 'Pushing Docker images to Docker Hub...'
                sh '''
                    docker push ${DOCKER_HUB_USERNAME}/${BACKEND_IMAGE}:latest
                    docker push ${DOCKER_HUB_USERNAME}/${FRONTEND_IMAGE}:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Successfully built and pushed all images to Docker Hub!'
        }
        failure {
            echo '❌ Build failed. Check Jenkins logs for details.'
        }
    }
}
