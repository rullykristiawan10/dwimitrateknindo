# Dwi Mitra Teknindo

Proyek ini adalah versi React.js untuk frontend dan Node.js/Express untuk backend dari website HVAC Dwi Mitra Teknindo.

## Struktur proyek

- `client/` - aplikasi React frontend
- `server/` - backend Node.js dengan endpoint kontak

## Menjalankan proyek

1. Buka terminal di folder `client` dan jalankan:

```bash
npm install
npm start
```

2. Buka terminal di folder `server` dan jalankan:

```bash
npm install
npm start
```

3. Akses frontend di `http://localhost:3000`.
   Backend tersedia di `http://localhost:5000`.

## API kontak

- `POST /api/contact`
  - body JSON: `name`, `phone`, `email`, `service`, `message`

## Catatan

Frontend akan mengirim pesan kontak ke backend Node.js. Backend saat ini hanya menerima data dan menampilkan log di terminal. Anda dapat mengembangkan lebih lanjut untuk menyimpan pesan ke database atau mengirim email.
