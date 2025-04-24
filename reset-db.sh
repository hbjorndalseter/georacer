#!/bin/bash

set -e  # Stopp hvis noe feiler

# === KONFIG ===
RAILWAY_DB_URL="postgresql://postgres:gaeDEba4AbGeeeDg1Dd53daC43bGg6dG@trolley.proxy.rlwy.net:36647/railway"
DUMP_FILE="cityhunter_db.sql"
VM_USER="hjalmabj"
VM_HOST="tba4250s03.it.ntnu.no"
REMOTE_TMP_PATH="/var/tmp/${DUMP_FILE}"
LOCAL_DB_NAME="cityhunter_db"
LOCAL_DB_USER="admin"
LOCAL_DB_PASSWORD="G3o-M4tics-AS-!"

echo "📤 Eksporterer Railway-database til ${DUMP_FILE}..."
pg_dump --no-owner --no-acl --clean "$RAILWAY_DB_URL" > "$DUMP_FILE"

echo "🚚 Overfører dump til VM..."
scp "$DUMP_FILE" ${VM_USER}@${VM_HOST}:${REMOTE_TMP_PATH}

echo "🔁 Importerer dump på VM..."
ssh ${VM_USER}@${VM_HOST} << EOF
  set -e

  echo "💣 Dropper eksisterende database..."
  export PGPASSWORD="${LOCAL_DB_PASSWORD}"
  dropdb -U ${LOCAL_DB_USER} -h localhost ${LOCAL_DB_NAME} || true

  echo "🧱 Oppretter ny database..."
  createdb -U ${LOCAL_DB_USER} -h localhost ${LOCAL_DB_NAME}

  echo "📥 Importerer dump..."
  psql -U ${LOCAL_DB_USER} -h localhost -d ${LOCAL_DB_NAME} < ${REMOTE_TMP_PATH}

  echo "✅ Database importert!"
EOF

echo "🎉 Ferdig! Railway-dumpen er nå flyttet og importert i lokal database på VM."