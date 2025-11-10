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
                    # Build from local backend folder
                    docker build -t ${BACKEND_IMAGE} ./backend_new
                    docker tag ${BACKEND_IMAGE} ${DOCKER_HUB_USERNAME}/${BACKEND_IMAGE}:latest
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building frontend Docker image...'
                sh '''
                    # Build from local frontend folder
                    docker build -t ${FRONTEND_IMAGE} ./frontend
                    docker tag ${FRONTEND_IMAGE} ${DOCKER_HUB_USERNAME}/${FRONTEND_IMAGE}:latest
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub...'
                sh '''
                    echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin
                '''
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo 'Pushing Docker images...'
                sh '''
                    docker push ${DOCKER_HUB_USERNAME}/${BACKEND_IMAGE}:latest
                    docker push ${DOCKER_HUB_USERNAME}/${FRONTEND_IMAGE}:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Successfully built and pushed backend & frontend images!'
        }
        failure {
            echo '❌ Build failed. Check Jenkins logs!'
        }
    }
}
