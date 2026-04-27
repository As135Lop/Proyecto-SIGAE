const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la base de datos
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Tu contraseña de MySQL
    database: 'sigae_db' // Asegúrate de que este sea el nombre de tu BD
});

// Ruta para crear el evento
app.post('/api/crear-evento', (req, res) => {
    const { nombre, descripcion, puntos, horario, fecha } = req.body;

    const sql = "INSERT INTO eventos (nombre, descripcion, puntos, horario, fecha) VALUES (?, ?, ?, ?, ?)";
    
    db.execute(sql, [nombre, descripcion, puntos, horario, fecha], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al registrar el evento en la base de datos' });
        }
        res.status(201).json({ message: 'Evento creado con éxito', id: result.insertId });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de SIGAE activo en http://localhost:${PORT}`);
});