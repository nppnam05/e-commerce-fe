pipeline {
    agent any

    environment {
        IMAGE_NAME = 'e-commerce-fe'
        CONTAINER_NAME = 'e-commerce-fe'
        APP_PORT = '3000'
        CONTAINER_PORT = '80'
        NETWORK = 'app_app-network'
        ENV_FILE = '/env/e-commerce-fe/e-commerce-fe.env'
    }

    stages {
        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    # Đọc file .env và truyền vào docker build dưới dạng --build-arg
                    export \$(cat ${ENV_FILE} | xargs)

                    docker build \
                        --build-arg VITE_SERVER_URI=\$VITE_SERVER_URI \
                        -t ${IMAGE_NAME}:latest .
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --network ${NETWORK} \
                        -p ${APP_PORT}:${CONTAINER_PORT} \
                        --restart always \
                        ${IMAGE_NAME}:latest
                """
            }
        }
    }

    post {
        success {
            echo '✅ Deploy e-commerce-fe thành công!'
        }
        failure {
            echo '❌ Deploy e-commerce-fe thất bại!'
        }
    }
}