// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// เปิด CORS สำหรับทุก origin
app.use(cors());
app.use(express.json());

// เชื่อมต่อ MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sql_company'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connection SQL:', err);
        return;
    }
    console.log('Connection SQL Success');
});

// POST /api/inser

app.post('/api/inser', (req, res) => {
    const {
        type_company,
        neme_company,
        address_company,
        group_company,
        village_company,
        ally_company,
        road_company,
        district_company,
        county_company,
        province_company,
        zicode_company,
        prefix_company,
        name,
        lastname,
        phonenumber,
        email,
        ref,
        username,
        password
    } = req.body;

    console.log(req.body);

    const query = `
        insert into usercompany 
        (type_company, neme_company, address_company, group_company, village_company, ally_company, road_company, district_company, county_company, province_company, zicode_company, prefix_company, name, lastname, phonenumber, email, ref, username, password)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [
        type_company,
        neme_company,
        address_company,
        group_company,
        village_company,
        ally_company,
        road_company,
        district_company,
        county_company,
        province_company,
        zicode_company,
        prefix_company,
        name,
        lastname,
        phonenumber,
        email,
        ref,
        username,
        password
    ], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({
            msg: 'Data inserted successfully',
            insertedId: results.insertId
        });
    });
});


app.post('/api/checkuser', (req, res) => {
    const { username } = req.body;
    console.log('Checking username:', username);
    const query = `
        select username 
        from sql_company.usercompany 
        where username = ?
    `;
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error checking username:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            res.json({ exists: true, username: results[0].username });
        } else {
            res.json({ exists: false });
        }
    });
});


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = `
        select username from usercompany 
        where username = ?
        and password = ?
    `;
    connection.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error checking username:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            res.json({ exists: true, username: results[0].username });
        } else {
            res.json({ exists: false });
        }
    });
});


app.post('/api/main', (req, res) => {
    const { username } = req.body;
    const query = `
        select 
            neme_company
            , idnumber
            , village_company
            , group_company
            , village_company
            , ally_company
            , road_company
            , district_company
            , county_company
            , province_company
            , zicode_company
        from sql_company.usercompany 
        where username = ?
    `;
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.length > 0) {
            res.json({
                success: true,
                data: results[0]
            });
        } else {
            res.json({
                success: false,
                message: 'ไม่พบข้อมูลผู้ใช้'
            });
        }
    });
});


app.listen(port, () => {
    console.log('Server is running on port:', port);
});
