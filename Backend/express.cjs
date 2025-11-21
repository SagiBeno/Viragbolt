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
            if (err) return res.status(500).json({ error: 'Lekérdezési hiba' });
            if (result) return res.status(200).json(result);
        }
    );
});

app.get('/api/flower/:id', (req, res) => {
    const id = +req.params?.id;
    if (isNaN(id)) return res.status(400).json({ msg: 'Hiányzó vagy nem megfelelő paraméter: id!' });
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
                if (err) return res.status(500).json({ error: 'SQL hiba!' });
                if (result.length === 0) return res.status(404).json({ msg: 'A virág nem található!' });
                else return res.status(200).json(result);
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
            if (err) return res.status(500).json({ error: 'SQL hiba!' });
            if (result) return res.status(200).json(result);
        }
    );
});

app.post('/api/flowers', (req, res) => {
    let nev = req.body?.nev;
    let leiras = req.body?.leiras;
    let kepUrl = req.body?.kepUrl;
    let keszlet = +req.body?.keszlet
    let kategoriaId = +req.body?.kategoriaId;
    let ar = +req.body?.ar;

    if (nev === undefined) return res.status(400).json({ msg: 'Hiányzó adat: név' });
    else {
        if (leiras === undefined) leiras = null;
        if (kepUrl === undefined) kepUrl = null;
        if (isNaN(keszlet)) keszlet = null;
        if (isNaN(kategoriaId)) kategoriaId = null;
        if (isNaN(ar)) ar = null;

        conn.query(
            `
                INSERT INTO aruk (nev, kategoriaId, leiras, keszlet, ar, kepUrl)
                VALUES (?, ?, ?, ?, ?, ?)
            `,
            [nev, kategoriaId, leiras, keszlet, ar, kepUrl],
            (err, result, fields) => {
                if (err) return res.status(500).json({ error: 'Sikertelen hozzáadás!' });
                if (result) return res.status(201).json({ msg: 'Sikeres hozzáadás!' });
            }
        );
    }
});

app.put('/api/flowers/:id', (req, res) => {
    const id = +req.params?.id
    const nev = req.body?.nev;
    const leiras = req.body?.leiras;
    const kepUrl = req.body?.kepUrl;
    const keszlet = +req.body?.keszlet
    const kategoriaId = +req.body?.kategoriaId;
    const ar = +req.body?.ar;
    var data = {};

    if (isNaN(id)) return res.status(400).json({ msg: 'Hiányzó vagy nem megfelelő paraméter: id!' });
    else {
        if (nev != undefined) data = { ...data, nev: nev};
        if (leiras != undefined) data = { ...data, leiras: leiras};
        if (kepUrl != undefined) data = { ...data, kepUrl: kepUrl};
        if (!isNaN(keszlet)) data = { ...data, keszlet: keszlet};
        if (!isNaN(kategoriaId)) data = { ...data, kategoriaId: kategoriaId};
        if (!isNaN(ar)) data = { ...data, ar: ar};

        conn.query(
            `
                UPDATE aruk SET ${Object.keys(data).map(key => `${key} = ?`).join(', ')} WHERE id = ?
            `,
            [ ...Object.values(data), id],
            (err, result, fields) => {
                if (err) return res.status(500).json({ error: 'SQL hiba' });
                if (result.affectedRows === 0) return res.status(404).json({ msg: 'Az adott azonosítóval nem található termék!' });
                else return res.status(200).json({ msg: 'Sikeres módosítás!'});
            }
        );
    }
});

app.delete('/api/flowers/:id', (req, res) => {
    const id = +req.params?.id;
    if (isNaN(id)) return res.status(400).json({ msg: 'Hiányzó vagy nem megfelelő paraméter: id!' });
    else {
        conn.query(
            `
                DELETE FROM aruk WHERE id = ?
            `
            [id],
            (err, result, fields) => {
                if (err) return res.status(500).json({ error: 'SQL hiba!' });
                if (result.affectedRows === 0) return res.status(404).json({ msg: 'A virág nem található!' });
                else return res.status(200).json({ msg: 'Sikeres törlés!' });
            }
        );
    }
});

const port = 3333;
app.listen(port, () => {
    console.log('Exp;ress backend server is running on port:', port);
});

