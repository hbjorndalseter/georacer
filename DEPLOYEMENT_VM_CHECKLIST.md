# Deployment Checklist: CityHunter til NTNU VM

Dette dokumentet beskriver stegene for å deployere CityHunter-prosjektet (frontend og backend) fra et lokalt utviklingsmiljø til en NTNU VM (`tba4250s0X.it.ntnu.no`).

**Forutsetninger:**

* Du har SSH-tilgang til VM-en som bruker `<brukernavn>`.
* Du har `psql`, `pg_dump`, `git`, `node`, `npm`, `rsync` installert lokalt.
* VM-en har `postgresql`, `postgis`, `curl`, `git`, `npm`, `node` (>=v20, helst via NVM), og `pm2` installert.
* Målmappe for prosjektkode på VM: `/var/www/GIB2_project`.
* Mappe for frontend-filer servert av Apache: `/var/www/html`.
* Database på VM: Navn `cityhunter_db`, Bruker `admin`.
* Backend-port på VM: `<BACKEND_PORT>` (f.eks. `3001`).

---

## A. Forberedelser (Lokal Maskin & VM)

1.  **(Lokal) Velg Riktig Branch:** Sørg for at du har sjekket ut den Git-branchen du vil deployere (f.eks. `main`).
    ```bash
    cd /path/to/your/cityhunter # Naviger til prosjektmappen lokalt
    git checkout main           # Eller den branchen du vil deployere
    git pull                    # Sørg for at du har siste versjon
    ```

2.  **(Lokal) Oppdater Frontend API URL:** Rediger koden i `frontend`-delen (f.eks. i en `.env`-fil eller konfigurasjonsfil) slik at API-kallene går mot VM-ens adresse og backend-porten (`<BACKEND_PORT>`).
    * Eksempel: Bytt ut `http://localhost:<BACKEND_PORT>/api` eller Railway-URLen med `http://tba4250s0X.it.ntnu.no:<BACKEND_PORT>/api`. (Bruk ditt gruppenummer for `X`).

3.  **(Lokal) Klargjør Backend Database URL:** Sjekk `.env`-filen i `backend`-mappen. Sørg for at `DATABASE_URL` peker mot VM-databasen. Sett inn riktig passord.
    ```dotenv
    # I backend/.env
    DATABASE_URL="postgresql://admin:<DITT_DB_PASSORD>@localhost:5432/cityhunter_db"
    ```

4.  **(VM) Sjekk/Installer Node.js v20+:** Koble til VM-en med SSH. Bruk NVM (anbefalt).
    ```bash
    ssh <brukernavn>@tba4250s0X.it.ntnu.no
    # Last NVM hvis nødvendig
    export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    # Bruk LTS (Long Term Support) versjonen (bør være >= v20)
    nvm use --lts
    # Verifiser
    node -v # Skal vise v20.x.x eller nyere
    ```
    * Hvis NVM/Node ikke er installert, følg instruksjoner for dette.

5.  **(VM) Klargjør Målmappe for Prosjektkode:** Opprett prosjektmappen og gi din bruker eierskap.
    ```bash
    sudo mkdir -p /var/www/GIB2_project
    sudo chown <brukernavn>:<brukernavn> /var/www/GIB2_project
    ```

## B. Database Migrering (Første gang, eller ved behov)

6.  **(Lokal) Eksporter Database (hvis nødvendig):** Ta en fersk dump fra Railway hvis dataene der har endret seg.
    ```bash
    # Erstatt med dine Railway-detaljer
    pg_dump "postgresql://USER:PASS@HOST:PORT/DBNAME" > cityhunter_dump.sql
    ```

7.  **(Lokal) Kopier Dump til VM:**
    ```bash
    scp cityhunter_dump.sql <brukernavn>@tba4250s0X.it.ntnu.no:/var/tmp/
    ```

8.  **(VM) Installer DB & Opprett DB/Bruker (hvis ikke gjort):**
    ```bash
    # sudo apt update && sudo apt install postgresql postgis -y
    # sudo -u postgres psql -c "CREATE DATABASE cityhunter_db;"
    # sudo -u postgres psql -c "CREATE USER admin WITH PASSWORD '<DITT_DB_PASSORD>';"
    # sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE cityhunter_db TO admin;"
    ```

9.  **(VM) Aktiver PostGIS Extension:**
    ```bash
    sudo -u postgres psql -d cityhunter_db -c "CREATE EXTENSION IF NOT EXISTS postgis;"
    ```

10. **(VM) Gi Nødvendige Rettigheter til `admin`:**
    ```bash
    sudo -u postgres psql -d cityhunter_db -c "GRANT USAGE, CREATE ON SCHEMA public TO admin;"
    ```

11. **(VM) Importer Data:**
    ```bash
    psql -U admin -d cityhunter_db -h localhost -f /var/tmp/cityhunter_dump.sql
    # Skriv inn DB-passordet. Ignorer ufarlige feil ('transaction_timeout', 'must be owner', 'already exists').
    ```

12. **(VM) Rydd opp dump-fil (valgfritt):**
    ```bash
    rm /var/tmp/cityhunter_dump.sql
    ```

## C. Backend Deployment

13. **(Lokal) Kopier Prosjektfiler til VM:**
    ```bash
    rsync -avz --exclude 'node_modules' --exclude '.git' /path/to/your/cityhunter/ <brukernavn>@tba4250s0X.it.ntnu.no:/var/www/GIB2_project/
    ```

14. **(VM) Installer Avhengigheter:** Kjør fra prosjektets rotmappe på VM.
    ```bash
    cd /var/www/GIB2_project
    npm install
    ```

15. **(VM) Kjør Prisma Generate:** Naviger inn i backend-mappen.
    ```bash
    cd backend
    npx prisma generate
    cd .. # Gå tilbake til prosjekt-roten
    ```

16. **(VM) Start/Restart Backend med PM2:**
    ```bash
    cd /var/www/GIB2_project
    # Stopp/slett gammel instans (erstatt navn hvis nødvendig)
    pm2 stop cityhunter-backend || true
    pm2 delete cityhunter-backend || true
    # Start ny instans (sjekk script i rotens package.json)
    # Sender port via argument -- --port <PORT> (krever at appen leser argument)
    pm2 start npm --name "cityhunter-backend" -- run start:backend -- --port <BACKEND_PORT>
    # Sjekk status og logger
    pm2 list
    pm2 logs cityhunter-backend
    # Lagre prosesslisten for omstart
    pm2 save
    ```

## D. Frontend Deployment

17. **(Lokal) Bygg Frontend:** Kjør fra frontend-mappen lokalt.
    ```bash
    cd /path/to/your/cityhunter/frontend
    npm run build
    ```

18. **(Lokal) Kopier Bygg-filer til Midlertidig Mappe på VM:**
    ```bash
    scp -r /path/to/your/cityhunter/frontend/dist/* <brukernavn>@tba4250s0X.it.ntnu.no:/var/tmp/frontend_build/
    ```

19. **(VM) Flytt Bygg-filer til Apache Root (`/var/www/html`):**
    ```bash
    # Slett gammelt innhold
    sudo rm -rf /var/www/html/*
    # Flytt nytt innhold
    sudo mv /var/tmp/frontend_build/* /var/www/html/
    # Rydd opp temp-mappe
    rm -rf /var/tmp/frontend_build
    ```

## E. Verifisering

20. **Test i Nettleser:** Åpne `http://tba4250s0X.it.ntnu.no` i nettleseren din.
21. **Sjekk Funksjonalitet:** Verifiser at siden laster, API-kall går til VM-backend (`http://tba4250s0X.it.ntnu.no:<BACKEND_PORT>/api/...`), og data vises/lagres korrekt. Bruk nettleserens utviklerverktøy (Network-fanen).
22. **Sjekk Logger (VM):** Ved feil, sjekk `pm2 logs cityhunter-backend` og evt. `sudo journalctl -u postgresql`.

---