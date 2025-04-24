#!/bin/bash

set -e  # Stopp scriptet hvis noe feiler

# === KONFIG ===
VM_USER="hjalmabj"
VM_HOST="tba4250s03.it.ntnu.no"
VM_DIR="/var/www/GIB2_project"
APACHE_DIR="/var/www/html"
BACKEND_ENTRY="index.js"

echo "🚧 Bygger frontend lokalt..."
cd frontend
npm install
npm run build
cd ..

echo "📦 Installerer deps i rotmappe..."
npm install

echo "🚚 Overfører hele prosjektet til VM..."
rsync -av --progress --exclude node_modules . ${VM_USER}@${VM_HOST}:${VM_DIR}/

echo "🖥️ Logger inn på VM og setter opp prosjektet..."
ssh ${VM_USER}@${VM_HOST} << EOF
  set -e

  echo "🧹 Rydder gammel frontend fra Apache..."
  sudo rm -rf ${APACHE_DIR}/*

  echo "📋 Kopierer ny dist til Apache dir..."
  sudo cp -r ${VM_DIR}/frontend/dist/* ${APACHE_DIR}/

  echo "📦 Installerer backend-deps..."
  cd ${VM_DIR}/backend
  npm install

  echo "🚀 Starter backend med PM2..."
  pm2 delete backend || true
  pm2 start ${BACKEND_ENTRY} --name backend
  pm2 save
EOF

echo "✅ Alt er deployet og backend kjører i PM2!"