const express = require('express'); // Corrige el typo
const dotenv = require('dotenv');
const corsMiddleware = require('./middleware/corsMiddleware');
const morganMiddleware = require('./middleware/morganMiddleware');
const logger = require('./utils/logger');
const database = require("./config/db");
const path = require('path');

// Configura las variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Inicializa express
const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);
app.use(morganMiddleware);


// Middleware de error
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send('Something went wrong');
});


// Importa las rutas
const authRoutes = require('./modules/auth/routes/authRoutes');
const profileRoutes = require('./modules/profile/routes/profileRoutes');
const contactRoutes = require('./modules/contact/routes/contactRoutes');

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