require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool, initDB } = require('./db');

const app = express();

const JWT_SECRET = process.env.JWT_SECRET || 'dwi_mitra_super_secret_key_2026';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(adminPassword, 10);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Akses ditolak. Token tidak ditemukan.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Sesi kedaluwarsa atau token tidak valid.' });
    req.user = user;
    next();
  });
};
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server Node berjalan dengan baik.' });
});

// Configure Multer for File Uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  console.log('Upload request received:', req.file ? req.file.originalname : 'No file');
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = '/uploads/' + req.file.filename;
  res.json({ url: fileUrl });
});

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, service, message } = req.body;
  if (!name || !phone || !email || !service || !message) {
    return res.status(400).json({ error: 'Semua field harus diisi.' });
  }
  
  try {
    await pool.query(
      'INSERT INTO contacts (id, name, phone, email, service, message) VALUES ($1, $2, $3, $4, $5, $6)',
      [Date.now(), name, phone, email, service, message]
    );
    console.log('Pesan kontak baru disimpan ke database:', { name, email });
    return res.status(200).json({ message: 'Pesan berhasil diterima.' });
  } catch (err) {
    console.error('Error saving contact:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan pesan.' });
  }
});

// Secured Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {
    const token = jwt.sign({ username: ADMIN_USERNAME }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, user: { username: ADMIN_USERNAME } });
  }
  return res.status(401).json({ error: 'Username atau password salah' });
});

// --- Products CRUD API ---
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/products', authenticateToken, async (req, res) => {
  const { image, title, description, tags, popular } = req.body;
  const id = Date.now();
  try {
    const { rows } = await pool.query(
      'INSERT INTO products (id, image, title, description, tags, popular) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, image, title, description, JSON.stringify(tags || []), popular || false]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/products/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { image, title, description, tags, popular } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE products SET image=$1, title=$2, description=$3, tags=$4, popular=$5 WHERE id=$6 RETURNING *',
      [image, title, description, JSON.stringify(tags || []), popular || false, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM products WHERE id=$1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Projects CRUD API ---
app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/projects', authenticateToken, async (req, res) => {
  const { image, badge, category, title, description, popular } = req.body;
  const id = Date.now();
  try {
    const { rows } = await pool.query(
      'INSERT INTO projects (id, image, badge, category, title, description, popular) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, image, badge, category, title, description, popular || false]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { image, badge, category, title, description, popular } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE projects SET image=$1, badge=$2, category=$3, title=$4, description=$5, popular=$6 WHERE id=$7 RETURNING *',
      [image, badge, category, title, description, popular || false, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM projects WHERE id=$1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Articles CRUD API ---
app.get('/api/articles', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM articles ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/articles', authenticateToken, async (req, res) => {
  const { image, date, category, title, description, popular } = req.body;
  const id = Date.now();
  try {
    const { rows } = await pool.query(
      'INSERT INTO articles (id, image, date, category, title, description, popular) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, image, date, category, title, description, popular || false]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/articles/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { image, date, category, title, description, popular } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE articles SET image=$1, date=$2, category=$3, title=$4, description=$5, popular=$6 WHERE id=$7 RETURNING *',
      [image, date, category, title, description, popular || false, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/articles/:id', authenticateToken, async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM articles WHERE id=$1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Documents CRUD API ---
app.get('/api/documents', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM documents ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/documents', authenticateToken, async (req, res) => {
  const { title, size, type, file } = req.body;
  const id = Date.now();
  try {
    const { rows } = await pool.query(
      'INSERT INTO documents (id, title, size, type, file) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, title, size, type, file]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/documents/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, size, type, file } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE documents SET title=$1, size=$2, type=$3, file=$4 WHERE id=$5 RETURNING *',
      [title, size, type, file, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/documents/:id', authenticateToken, async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM documents WHERE id=$1', [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve Frontend in Production
const clientBuildPath = path.join(__dirname, '../client/build');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Initialize DB then start server
initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});
