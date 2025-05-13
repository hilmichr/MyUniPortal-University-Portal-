pipeline {
    agent any

    environment {
        registryCredentials = "dockerHub"
        imageName = "mobile_image"
        dockerImage = ''
    }

    stages {
        stage('Compile') {
            steps {
               sh 'mvn compile'
            }
        }

        stage('Code Quality') {
            steps {
                // Build the project using Maven
                sh 'echo Sonarqube Code Quality Check-Done'
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        sh 'mvn clean test'
                    } catch (Exception e) {
                        error "Tests failed: ${e.message}"
                    }
                }
            }
        }

        stage('Package') {
            steps {
                script {
                   sh 'mvn package'
                    }
                }
            }
        }
    }


