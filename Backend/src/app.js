const express = require('express'); // Corrige el typo
const corsMiddleware = require('./middlewares/corsMiddleware');
const dotenv = require('dotenv');
const database = require("./config/db");
const path = require('path');

// Configura las variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Inicializa express
const app = express();

database.connect((err) => {
    if (err) throw err;

    console.log("Connect to database " + process.env.DATABASE_NAME);
});

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Importa las rutas
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Base route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});