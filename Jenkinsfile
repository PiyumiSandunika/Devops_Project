pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKER_HUB_USERNAME = 'piyumi00'
        BACKEND_IMAGE = 'devops_project_backend'
        FRONTEND_IMAGE = 'devops_project_frontend'
        GITHUB_REPO = 'https://github.com/PiyumiSandunika/Devops_Project.git'
        
        // The ID of the SSH Private Key credential you added in Jenkins for EC2 access
        SSH_CREDENTIAL_ID = 'ec2-ssh-key'
        EC2_PUBLIC_IP = '98.93.212.39'
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
                // This requires the 'SSH Agent' plugin installed in Jenkins
                sshagent(["${SSH_CREDENTIAL_ID}"]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_PUBLIC_IP} << 'EOF'
                            cd ~/Devops_Project
                            git pull origin main
                            docker-compose pull
                            docker-compose up -d
                            docker system prune -f
                        EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful! Your app is live at http://98.93.212.39:5173'
        }
        failure {
            echo '❌ build or deployment failed. Check the Jenkins console output.'
        }
    }
}