pipeline {
  agent {
    kubernetes {
      defaultContainer "jnlp"
      yaml """
apiVersion: v1
kind: Pod
spec:
  imagePullSecrets:
    - name: regcred
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:v1.23.2-debug
    command: ["/busybox/cat"]
    tty: true
    volumeMounts:
      - name: docker-config
        mountPath: /kaniko/.docker
  - name: kubectl
    image: jicamposr/kubectl:1.31.3
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
              // NOTE triple-single-quotes => no Groovy interpolation
              sh '''
                set -euo pipefail

                # Write Docker Hub auth config (shell expands env vars)
                cat > /kaniko/.docker/config.json <<EOF
                {
                  "auths": {
                    "https://index.docker.io/v1/": {
                      "username": "${DOCKERHUB_USER}",
                      "password": "${DOCKERHUB_PASS}"
                    }
                  }
                }
EOF

                /kaniko/executor \
                  --context $(pwd) \
                  --dockerfile Dockerfile \
                  --destination ${IMAGE_REPO}:${GIT_SHA} \
                  --destination ${IMAGE_REPO}:latest \
                  --cache=true \
                  --cache-repo ${IMAGE_REPO}-cache \
                  --snapshot-mode=redo \
                  --use-new-run \
                  --cache-copy-layers \
                  --cache-run-layers
              '''
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
              // also triple-single-quotes; keep -x ONLY after secrets are not printed
              sh '''
                set -euo pipefail

                # decode kubeconfig safely (echo can mangle stuff)
                printf '%s' "${CCM_KUBECONFIG_B64}" | base64 -d > /tmp/kubeconfig
                export KUBECONFIG=/tmp/kubeconfig

                echo "== kubeconfig decoded, testing connectivity =="
                kubectl get ns --request-timeout=20s

                echo "== updating image to ${IMAGE_REPO}:${GIT_SHA} =="
                kubectl -n ${DEPLOY_NS} set image deployment/${DEPLOYMENT} \
                  ${CONTAINER}=${IMAGE_REPO}:${GIT_SHA} \
                  --request-timeout=20s

                kubectl -n ${DEPLOY_NS} rollout status deployment/${DEPLOYMENT} --timeout=180s
              '''
            }
          }
        }
      }
    }
  }
}
