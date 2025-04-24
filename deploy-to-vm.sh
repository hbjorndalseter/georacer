#!/bin/bash

# === KONFIGURASJON ===
VM_USER="hjalmabj"
VM_HOST="tba4250s03.it.ntnu.no"
TMP_DIR="/var/tmp/GIB2_project"
FRONTEND_DIST_DIR="frontend/dist"
BACKEND_DIR="backend"
VM_FRONTEND_DIR="/var/www/html"
VM_BACKEND_DIR="/var/www/backend"
BACKEND_ENTRY="index.js"

echo "🚧 Bygger frontend..."
npm run build

echo "🚚 Kopierer frontend til VM..."
scp -r ${FRONTEND_DIST_DIR}/* ${VM_USER}@${VM_HOST}:${TMP_DIR}/

echo "🔄 Synkroniserer backend (uten node_modules)..."
rsync -av --progress --exclude node_modules ${BACKEND_DIR} ${VM_USER}@${VM_HOST}:${TMP_DIR}/

echo "🖥️ Logger inn på VM og flytter filer..."
ssh ${VM_USER}@${VM_HOST} << EOF
  echo "🧹 Rydder gammel frontend..."
  sudo rm -rf ${VM_FRONTEND_DIR}/*

  echo "📦 Flytter frontend til Apache-dir..."
  sudo mv ${TMP_DIR}/* ${VM_FRONTEND_DIR}/

  echo "🧹 Rydder gammel backend..."
  sudo rm -rf ${VM_BACKEND_DIR}/*

  echo "📦 Flytter backend til /var/www/backend..."
  sudo mv ${TMP_DIR}/backend/* ${VM_BACKEND_DIR}/

  echo "📦 Installerer avhengigheter..."
  cd ${VM_BACKEND_DIR}
  npm install

  echo "🚀 Starter backend med PM2..."
  pm2 delete backend || true
  pm2 start ${BACKEND_ENTRY} --name backend
  pm2 save
EOF

echo "✅ Deploy fullført!"