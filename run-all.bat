@echo off
cd /d "%~dp0"
echo ========================================================
echo Memulai Proyek Dwi Mitra Teknindo (React ^& Node.js)
echo ========================================================

echo.
echo [1/4] Memeriksa dan menginstal dependensi untuk Server...
cd server
call npm install

echo.
echo [2/4] Memeriksa dan menginstal dependensi untuk Client...
cd ../client
call npm install

echo.
echo [3/4] Menjalankan Backend Server (Node.js)...
cd ..
start "Backend Server" cmd /k "cd server && npm start"

echo.
echo [4/4] Menjalankan Frontend Client (React.js)...
start "Frontend Client" cmd /k "cd client && npm start"

echo.
echo ========================================================
echo Semua layanan sedang dijalankan pada jendela terpisah.
echo - Backend Node.js akan berjalan di port 5000
echo - Frontend React.js akan terbuka otomatis di browser (port 3000)
echo ========================================================
pause
