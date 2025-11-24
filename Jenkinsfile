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
    image: google/cloud-sdk:alpine
    command: ["sh", "-c", "sleep infinity"]
    tty: true
  volumes:
    - name: docker-config
      emptyDir: {}
"""
    }
  }

  environment {
    IMAGE_REPO = "jicamposr/portfolio"
    DEPLOY_NS  = "universidad"
    DEPLOYMENT = "portfolio"
    CONTAINER  = "portfolio"
  }

  stages {

    stage("Prepare") {
      steps {
        script {
          env.GIT_SHA = (env.GIT_COMMIT ?: "").take(8)
          echo "Using GIT_SHA=${env.GIT_SHA}"
        }
      }
    }

    stage("Build & Push") {
      steps {
        script {
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
                  --destination ${IMAGE_REPO}:\$GIT_SHA \
                  --destination ${IMAGE_REPO}:latest \
                  --cache=true \
                  --cache-repo ${IMAGE_REPO}-cache \
                  --snapshot-mode=redo \
                  --use-new-run \
                  --cache-copy-layers \
                  --cache-run-layers
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
              set -x

              # decode kubeconfig safely (echo can mangle stuff)
              printf '%s' "\$CCM_KUBECONFIG_B64" | base64 -d > /tmp/kubeconfig
              export KUBECONFIG=/tmp/kubeconfig

              echo "== kubeconfig decoded, testing connectivity =="

              # fail fast if API can't be reached/auth'd
              kubectl version --short --request-timeout=20s
              kubectl get ns --request-timeout=20s

              echo "== updating image to ${IMAGE_REPO}:\$GIT_SHA =="

              kubectl -n ${DEPLOY_NS} set image deployment/${DEPLOYMENT} \
                ${CONTAINER}=${IMAGE_REPO}:\$GIT_SHA \
                --request-timeout=20s

              kubectl -n ${DEPLOY_NS} rollout status deployment/${DEPLOYMENT} --timeout=180s
            """
            }
          }
        }
      }
    }
  }
}
