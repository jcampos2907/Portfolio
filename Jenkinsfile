pipeline {
  agent {
    kubernetes {
      defaultContainer "jnlp"
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:v1.23.2-debug
    command: ["/busybox/cat"]
    tty: true
    volumeMounts:
      - name: docker-config
        mountPath: /kaniko/.docker
  - name: kubectl
    image: bitnami/kubectl:latest
    command: ["cat"]
    tty: true
  volumes:
    - name: docker-config
      emptyDir: {}
"""
    }
  }

  environment {
    IMAGE_REPO = "jicamposr/portfolio"     // Docker Hub repo
    DEPLOY_NS  = "universidad"
    DEPLOYMENT = "portfolio"
    CONTAINER  = "portfolio"
  }

  stages {

    stage("Build & Push") {
      steps {
        script {
          // Jenkins provides this from the default checkout
          def gitSha = (env.GIT_COMMIT ?: "").take(8)

          def secrets = [[
            path: "kv/apps/jenkins",
            engineVersion: 2,
            secretValues: [
              [envVar: "DOCKERHUB_USER", vaultKey: "DOCKERHUB_USER"],
              [envVar: "DOCKERHUB_PASS", vaultKey: "DOCKERHUB_PASS"]
            ]
          ]]

          withVault(vaultSecrets: secrets) {
            container("kaniko") {
              sh """
                set -euo pipefail

                # Write Docker Hub auth config (shell expands env vars)
                cat > /kaniko/.docker/config.json <<EOF
                {
                  "auths": {
                    "https://index.docker.io/v1/": {
                      "username": "\$DOCKERHUB_USER",
                      "password": "\$DOCKERHUB_PASS"
                    }
                  }
                }
EOF

                /kaniko/executor \
                  --context \$(pwd) \
                  --dockerfile Dockerfile \
                  --destination ${IMAGE_REPO}:${gitSha} \
                  --destination ${IMAGE_REPO}:latest \
                  --cache=true \
                  --snapshotMode=redo \
                  --single-snapshot
              """
            }
          }
        }
      }
    }

    stage("Deploy to CCM cluster") {
      steps {
        script {
          def secrets = [[
            path: "kv/apps/jenkins",
            engineVersion: 2,
            secretValues: [
              [envVar: "CCM_KUBECONFIG_B64", vaultKey: "CCM_KUBECONFIG_B64"]
            ]
          ]]

          withVault(vaultSecrets: secrets) {
            container("kubectl") {
              sh """
                set -euo pipefail

                echo "\$CCM_KUBECONFIG_B64" | base64 -d > /tmp/kubeconfig
                export KUBECONFIG=/tmp/kubeconfig

                GIT_SHA=${gitSha}

                # Update deployment to the new image tag
                kubectl -n ${DEPLOY_NS} set image deployment/${DEPLOYMENT} \
                  ${CONTAINER}=${IMAGE_REPO}:\$GIT_SHA

                # Wait for rollout
                kubectl -n ${DEPLOY_NS} rollout status deployment/${DEPLOYMENT}
              """
            }
          }
        }
      }
    }
  }
}
