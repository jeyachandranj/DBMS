const express = require('express');
const router = express.Router();
const Contest = require('../models/Contest');

router.post('/create', async (req, res) => {
  try {
    const { contestName, description, startTime, endTime } = req.body;

    const newContest = new Contest({
      contestName,
      description,
      startTime,
      endTime,
    });

    const savedContest = await newContest.save();
    res.status(201).json({ contestId: savedContest._id, message: 'Contest created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contest', error });
  }
});

module.exports = router;
