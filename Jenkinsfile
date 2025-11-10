pipeline {
    agent any

    environment {
        DOCKERHUB_CREDS = 'dockerhub-creds'
        DOCKERHUB_USER  = 'piyumi00'
        BACKEND_IMAGE   = "${DOCKERHUB_USER}/devops_project_backend:latest"
        FRONTEND_IMAGE  = "${DOCKERHUB_USER}/devops_project_frontend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                echo 'Building backend image...'
                sh 'docker build -t devops_project-backend ./BUILDAURA_B'

                echo 'Building frontend image...'
                sh 'docker build -t devops_project-frontend ./BUILDAURA_F'
            }
        }

        stage('Tag Images') {
            steps {
                sh "docker tag devops_project-backend ${BACKEND_IMAGE}"
                sh "docker tag devops_project-frontend ${FRONTEND_IMAGE}"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
                    sh 'echo $DH_PASS | docker login -u $DH_USER --password-stdin'
                    sh "docker push ${BACKEND_IMAGE}"
                    sh "docker push ${FRONTEND_IMAGE}"
                    sh 'docker logout'
                }
            }
        }

        stage('Deploy Containers') {
    steps {
        echo 'Removing old containers if they exist...'
        sh 'docker rm -f mongo  true'
        sh 'docker rm -f backend  true'
        sh 'docker rm -f frontend || true'

        echo 'Deploying using Docker Compose...'
        sh 'docker-compose up -d --build'
    }
}

    }

    post {
        always {
            echo 'Cleaning up unused Docker images...'
            sh 'docker image prune -f'
        }
    }
}