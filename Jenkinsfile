pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKER_HUB_USERNAME = 'piyumi00'
        BACKEND_IMAGE = 'devops_project_backend'
        FRONTEND_IMAGE = 'devops_project_frontend'
        GITHUB_REPO = 'https://github.com/PiyumiSandunika/Devops_Project.git'
        
        EC2_PUBLIC_IP = '98.93.212.39'
        JENKINS_SSH_KEY = '/var/lib/jenkins/.ssh/id_ed25519'
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
                sh "docker build -t ${DOCKER_HUB_USERNAME}/${BACKEND_IMAGE}:latest ./backend_new"
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building frontend Docker image...'
                sh "docker build -t ${DOCKER_HUB_USERNAME}/${FRONTEND_IMAGE}:latest ./frontend"
            }
        }

        stage('Login to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub...'
                sh "echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo 'Pushing Docker images...'
                sh "docker push ${DOCKER_HUB_USERNAME}/${BACKEND_IMAGE}:latest"
                sh "docker push ${DOCKER_HUB_USERNAME}/${FRONTEND_IMAGE}:latest"
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'Connecting to EC2 and updating containers...'
                sh """
                    ssh -i ${JENKINS_SSH_KEY} -o StrictHostKeyChecking=no ubuntu@${EC2_PUBLIC_IP} '
                        cd ~/Devops_Project
                        git pull origin main
                        docker-compose pull
                        docker-compose up -d
                        docker system prune -f
                    '
                """
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful! Your app is live at http://98.93.212.39:5173'
        }
        failure {
            echo '❌ Build or deployment failed. Check the Jenkins console output.'
        }
    }
}
