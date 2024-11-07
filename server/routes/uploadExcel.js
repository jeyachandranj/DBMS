const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DBMS',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

function determineColumnTypes(data) {
  const columnTypes = {};
  data.forEach((row) => {
    Object.keys(row).forEach((col) => {
      if (columnTypes[col] === undefined) {
        if (typeof row[col] === 'number') {
          columnTypes[col] = 'FLOAT'; 
        } else if (typeof row[col] === 'boolean') {
          columnTypes[col] = 'BOOLEAN';
        } else {
          columnTypes[col] = 'VARCHAR(255)'; 
        }
      }
    });
  });
  return columnTypes;
}

const router = express.Router();

router.post('/uploadExcel', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { tableName, attributes } = req.body;

  if (!tableName || !attributes) {
    return res.status(400).json({ error: 'Table name and attributes are required' });
  }

  const filePath = req.file.path;

  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const columns = attributes.split(',').map((attr) => attr.trim());
    const sheetColumns = Object.keys(jsonData[0]);

    const missingColumns = columns.filter((col) => !sheetColumns.includes(col));
    if (missingColumns.length > 0) {
      return res.status(400).json({ error: `Missing columns in the Excel sheet: ${missingColumns.join(', ')}` });
    }

    const columnTypes = determineColumnTypes(jsonData);

    const createTableQuery = `CREATE TABLE IF NOT EXISTS ?? (${columns
      .map((col) => `${col} ${columnTypes[col] || 'VARCHAR(255)'}`)
      .join(', ')})`;
    db.query(createTableQuery, [tableName], (err) => {
      if (err) {
        console.error('Error creating table:', err);
        fs.unlinkSync(filePath);
        return res.status(500).json({ error: 'Failed to create table' });
      }

      const values = jsonData.map((row) => columns.map((col) => row[col]));

      const insertQuery = `INSERT INTO ?? (${columns.map(() => '??').join(', ')}) VALUES ?`;
      const queryValues = [tableName, ...columns, values];

      db.query(insertQuery, queryValues, (err, result) => {
        fs.unlinkSync(filePath);

        if (err) {
          console.error('Error inserting data into MySQL:', err);
          return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }

        res.status(200).json({ message: `${result.affectedRows} records inserted successfully` });
      });
    });
  } catch (err) {
    console.error('Error processing Excel file:', err);
    fs.unlinkSync(filePath); 
    return res.status(500).json({ error: 'Failed to process Excel file' });
  }
});


router.get('/execute-query', (req, res) => {
    const sqlQuery = req.query.sql;
    if (!sqlQuery) {
      return res.status(400).send('SQL query is required');
    }
    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Error executing query');
      }
      res.json(results);
    });
  });

module.exports = router;
