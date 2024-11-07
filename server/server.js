const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contestRoutes = require('./routes/contest');
const challengeRoutes = require('./routes/challenge');
const cors = require('cors')
const uploadExcelRoutes = require('./routes/uploadExcel');

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use('/api/contest', contestRoutes);
app.use('/api/challenge', challengeRoutes);
app.use('/api', uploadExcelRoutes); 

mongoose.connect('mongodb://localhost:27017/DBMS')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


  // const db = mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   password: '',
  //   database: 'DBMS'
  // });
  
  // db.connect((err) => {
  //   if (err) {
  //     console.error('Error connecting to MySQL:', err);
  //   } else {
  //     console.log('Connected to MySQL');
  //   }
  // });
  
  // const uploadDir = './uploads';
  // if (!fs.existsSync(uploadDir)) {
  //   fs.mkdirSync(uploadDir);
  // }
  
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, uploadDir);
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + '-' + file.originalname);
  //   }
  // });
  // const upload = multer({ storage: storage });

  // function determineColumnTypes(data) {
  //   const columnTypes = {};
  //   data.forEach(row => {
  //     Object.keys(row).forEach(col => {
  //       if (columnTypes[col] === undefined) {
  //         if (typeof row[col] === 'number') {
  //           columnTypes[col] = 'FLOAT'; // assuming number type as float
  //         } else if (typeof row[col] === 'boolean') {
  //           columnTypes[col] = 'BOOLEAN';
  //         } else {
  //           columnTypes[col] = 'VARCHAR(255)'; // default to VARCHAR for strings
  //         }
  //       }
  //     });
  //   });
  //   return columnTypes;
  // }
  
  // // POST endpoint for uploading Excel
  // app.post('/uploadExcel', upload.single('file'), (req, res) => {
  //   if (!req.file) {
  //     return res.status(400).json({ error: 'No file uploaded' });
  //   }
  
  //   // Extract table name and attributes from the request body
  //   const { tableName, attributes } = req.body;
    
  //   if (!tableName || !attributes) {
  //     return res.status(400).json({ error: 'Table name and attributes are required' });
  //   }
  
  //   const filePath = req.file.path;
  
  //   try {
  //     // Read the Excel file
  //     const workbook = xlsx.readFile(filePath);
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const jsonData = xlsx.utils.sheet_to_json(sheet);
  
  //     // Validate that the attributes match the data columns in the Excel sheet
  //     const columns = attributes.split(',').map(attr => attr.trim());
  //     const sheetColumns = Object.keys(jsonData[0]);
  
  //     // Ensure the provided attributes exist in the sheet columns
  //     const missingColumns = columns.filter(col => !sheetColumns.includes(col));
  //     if (missingColumns.length > 0) {
  //       return res.status(400).json({ error: `Missing columns in the Excel sheet: ${missingColumns.join(', ')}` });
  //     }
  
  //     // Determine column types from Excel data
  //     const columnTypes = determineColumnTypes(jsonData);
  
  //     // Generate CREATE TABLE query
  //     const createTableQuery = `CREATE TABLE IF NOT EXISTS ?? (${columns.map(col => `${col} ${columnTypes[col] || 'VARCHAR(255)'}`).join(', ')})`;
  //     db.query(createTableQuery, [tableName], (err) => {
  //       if (err) {
  //         console.error('Error creating table:', err);
  //         fs.unlinkSync(filePath); // Delete the file after processing
  //         return res.status(500).json({ error: 'Failed to create table' });
  //       }
  
  //       // Extract the relevant values based on the provided columns
  //       const values = jsonData.map(row => columns.map(col => row[col]));
  
  //       // Construct the dynamic SQL insert statement
  //       const insertQuery = `INSERT INTO ?? (${columns.map(() => '??').join(', ')}) VALUES ?`;
  //       const queryValues = [tableName, ...columns, values];
  
  //       // Insert data into MySQL
  //       db.query(insertQuery, queryValues, (err, result) => {
  //         // Delete the file after processing
  //         fs.unlinkSync(filePath);
  
  //         if (err) {
  //           console.error('Error inserting data into MySQL:', err);
  //           return res.status(500).json({ error: 'Failed to insert data into MySQL' });
  //         }
  
  //         res.status(200).json({ message: `${result.affectedRows} records inserted successfully` });
  //       });
  //     });
  
  //   } catch (err) {
  //     console.error('Error processing Excel file:', err);
  //     fs.unlinkSync(filePath); // Delete the file in case of an error
  //     return res.status(500).json({ error: 'Failed to process Excel file' });
  //   }
  // });
  
 

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
