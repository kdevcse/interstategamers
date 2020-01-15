pipeline {
    agent any
    
    environment {
        NetlifyBuildHook = credentials('NetlifyBuildHook')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'yarn'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'yarn test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'curl -X POST -d {} ${NetlifyBuildHook}'
            }
        }
    }
}
