pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                yarn
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                yarn test
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                curl -X POST -d {} ${NetlifyBuildHook}
            }
        }
    }
}
