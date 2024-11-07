const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');

const upload = multer({ dest: 'uploads/' });

router.post('/:contestId/createChallenge', upload.single('outputFile'), async (req, res) => {
  const { contestId } = req.params;
  const { tableName, attributes, question, description, hints, tags } = req.body;
  const outputFile = req.file;

  console.log("Uploaded file info:", outputFile);

  // Validate the input fields
  if (!tableName || !attributes || !question || !description || !hints || !tags || !outputFile) {
    return res.status(400).json({ error: 'All fields, including outputFile, are required' });
  }

  try {
    const newChallenge = new Challenge({
      contestId,
      tableName,
      attributes,
      question,
      description,
      hints,
      tags
    });

    const savedChallenge = await newChallenge.save();

    let outputData = [];
    fs.createReadStream(outputFile.path)
      .pipe(csv())
      .on('data', (row) => {
        console.log("Raw row data:", row);  // Log the row to see its structure

        // You can store the entire row, including name, email, and score
        let rowData = {
          name: row.name.trim(),
          email: row.email.trim(),
          score: Number(row.score.trim()) // Ensure it's a number
        };

        // Check if score is a valid number
        if (!isNaN(rowData.score)) {
          outputData.push(rowData);  // Store the full row with name, email, and score
        } else {
          console.warn(`Warning: Non-numeric value in CSV row (score: ${row.score})`);
        }
      })
      .on('end', async () => {
        try {
          // Only update if there is valid data
          if (outputData.length > 0) {
            savedChallenge.outputData = outputData; // Store full row data
            await savedChallenge.save();

            // Clean up uploaded file
            fs.unlink(outputFile.path, (err) => {
              if (err) console.error('Error deleting file:', err);
            });

            res.status(200).json({
              message: 'Challenge and output data saved successfully',
              challengeId: savedChallenge._id
            });
          } else {
            res.status(400).json({ error: 'No valid numeric scores found in the file' });
          }
        } catch (err) {
          console.error('Error saving output data to challenge:', err);
          res.status(500).json({ error: 'Failed to save output data' });
        }
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        res.status(500).json({ error: 'Error processing CSV file' });
      });
  } catch (err) {
    console.error('Error creating challenge:', err);
    res.status(500).json({ error: 'Failed to create challenge' });
  }
});

module.exports = router;
