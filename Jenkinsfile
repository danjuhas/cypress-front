import groovy.json.JsonOutput

def taskNameCF = "qa"
def props = ''

def sendGoogleChat(mensagem){
    def command = """curl -d '{"text": "${mensagem}"}' -H \"Content-Type: application/json\" -X POST \'${env.GOOGLE_CHAT_URL}\'"""
    sh command
}

pipeline {
  agent {
    kubernetes {
      label "jenkins-slave-${taskNameCF}"
      defaultContainer 'jnlp'
      yaml """
            apiVersion: v1
            kind: Pod
            metadata:
              labels:
                some-label: ${taskNameCF}
            spec:
              containers:
              - name: docker-slave-${taskNameCF}
                image: '507208215022.dkr.ecr.us-east-1.amazonaws.com/ecr-jenkins-slave-qa:latest'
                securityContext:
                  privileged: true
                resources:
                  limits:
                    memory: "4Gi"
                    cpu: "4"
                  requests:
                    memory: "2Gi"
                    cpu: "2"
                tty: true
                volumeMounts:
                - name: dockersock
                  mountPath: /var/run/docker.sock
                - name: dockerconfig
                  mountPath: /var/lib/docker/
                command:
                - cat
              volumes:
              - name: dockersock
                hostPath:
                  path: /var/run/docker.sock
              - name: dockerconfig
                hostPath:
                  path: /var/lib/docker/
            """
    }
  }

  environment {
    GOOGLE_CHAT_URL = "https://link_chat_google.com"
  }

  stages {
    stage("Install") {
      steps {
        container("docker-slave-${taskNameCF}") {
          sh "npm install"
        }
      }
    }
    stage('cypress parallel tests') {
      parallel {
        stage('POD 1') {
          steps {
            container("docker-slave-${taskNameCF}") {
              script {
                if (ENVIRONMENT == 'SMOKE') {
                  props = readJSON file: './jenkinsPodsManualSmoke.json'
                } else {
                  props = readJSON file: './jenkinsPodsManualRegression.json'
                }
                if (TAGS != '') {
                  sh "SPECS=$TAGS PHONE=$PHONE BROWSER=$BROWSER ENV=hml node cypress-automation-run.js"
                } else if (ENVIRONMENT == 'PRD') {
                  sh "SPECS=$props.pod0 PHONE=$PHONE BROWSER=$BROWSER ENV=prd node cypress-automation-run.js"
                  // sh "PODINDEX=0 BROWSER=$BROWSER ENV=prd node cypress-automation-run.js"
                } else if (ENVIRONMENT == 'HML' || ENVIRONMENT == 'SMOKE') {
                  sh "SPECS=$props.pod0 PHONE=$PHONE BROWSER=$BROWSER ENV=hml node cypress-automation-run.js"
                  // sh "PODINDEX=0 BROWSER=$BROWSER ENV=hml node cypress-automation-run.js"
                }
              }
            }
          }
        }
        stage('POD 2') {
          steps {
            container("docker-slave-${taskNameCF}") {
              script {
                if (ENVIRONMENT == 'SMOKE') {
                  props = readJSON file: './jenkinsPodsManualSmoke.json'
                } else {
                  props = readJSON file: './jenkinsPodsManualRegression.json'
                }
                if (TAGS != '') {
                  print "Execucao de uma unica Feature"
                } else if (ENVIRONMENT == 'PRD') {
                  // sh "PODINDEX=1 BROWSER=$BROWSER ENV=prd node cypress-automation-run.js"
                  sh "SPECS=$props.pod1 PHONE=$PHONE BROWSER=$BROWSER ENV=prd node cypress-automation-run.js"
                } else if (ENVIRONMENT == 'HML' || ENVIRONMENT == 'SMOKE') {
                  // sh "PODINDEX=1 BROWSER=$BROWSER ENV=hml node cypress-automation-run.js"
                  sh "SPECS=$props.pod1 PHONE=$PHONE BROWSER=$BROWSER ENV=hml node cypress-automation-run.js"
                }
              }
            }
          }
        }
      }
      post {
        always {
          container("docker-slave-${taskNameCF}") {  
            script {
              publishHTML target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                includes: '**/*',
                keepAll: true,
                reportDir: 'mochawesome-report/',
                reportFiles: 'mochawesome.html',
                reportName: 'Mochawesome Report'
              ]
            }
          }
        }
      }
    }
    stage("Check Build") {
      steps {
        container("docker-slave-${taskNameCF}") {
          script {
            def json_mocha = readJSON file: './json_result.json'
            if (json_mocha['failures'] == 0) {
                currentBuild.result = 'SUCCESS'
            }else {
              currentBuild.result = 'FAILURE'
            }
          }
        }
      }
      post {
        always {
          container("docker-slave-${taskNameCF}") {  
            script {
              if (ENVIRONMENT != '') {
                // Enviar notificação para o Google Chat
                print "Sending notification"
                sendGoogleChat("[${ENVIRONMENT}][${env.JOB_BASE_NAME}] - *Build number ${currentBuild.number}* - ${currentBuild.result} \n Para mais detalhes, acesse o link:\n" + 
                "http://jenkins.soupi.com.br/job/${env.JOB_BASE_NAME}/${currentBuild.number}/Mochawesome_20Report/") 
                print "Notification was sent"
              }
            }
          }
        }
      }
    }
  }
}