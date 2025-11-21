const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nevenincs'
});

conn.connect(err => {
    if (err) console.warn
    else console.log('Succesfully connected to database: nevenincs.')
});

app.get('/api/flowers', (req, res) => {
    conn.query(
        `
            SELECT aruk.id, aruk.nev, aruk.leiras, aruk.keszlet, aruk.ar, aruk.kepUrl, kategoriak.nev AS 'kategoria_nev'
            FROM aruk
            INNER JOIN kategoriak ON aruk.kategoriaId = kategoriak.id
        `,
        (err, result, fields) => {
            if (err) res.status(500).json({ error: 'Database query error' });
            if (result) res.status(200).json(result);
        }
    );
});

app.get('/api/flower/:id', (req, res) => {
    const id = req.params?.id;
    if (!id) res.status(400).json({msg: 'Hiányzó paraméter: id'});
    else {
        conn.query(
            `
                SELECT aruk.id, aruk.nev, aruk.leiras, aruk.keszlet, aruk.ar, aruk.kepUrl, kategoriak.nev AS 'kategoria_nev'
                FROM aruk
                INNER JOIN kategoriak ON aruk.kategoriaId = kategoriak.id
                WHERE aruk.id = ?
            `,
            [id],
            (err, result, fields) => {
                if (err) res.status(500).json({ error: 'Database query error' });
                if (result.length === 0) {
                    res.status(404).json({msg: 'A virág nem található'});
                } else res.status(200).json(result);
            }
        );
    }
});

app.get('/api/categories', (req, res) => {
    conn.query(
        `
            SELECT * FROM kategoriak
        `,
        (err, result, fields) => {
            if (err) res.status(500).json({ error: 'Database query error' });
            if (result) res.status(200).json(result);
        }
    );
})

const port = 3333;
app.listen(port, () => {
    console.log('Express backend server is running on port:', port);
});

