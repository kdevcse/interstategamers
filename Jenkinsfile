pipeline {
    agent any
    
    environment {
        NetlifyBuildHook = credentials('NetlifyBuildHook')
        Branch = "${GIT_BRANCH}"
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
                sh 'if ${Branch} = \'master\'; then curl -X POST -d {} ${NetlifyBuildHook} fi'
            }
        }
    }
}
