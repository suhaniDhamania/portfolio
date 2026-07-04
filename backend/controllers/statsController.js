const FileDb = require('../models/fileDb');

const startTime = Date.now();
let requestCount = 0;

exports.trackRequest = (req, res, next) => {
  requestCount++;
  next();
};

exports.getStats = (req, res) => {
  try {
    const contactCount = FileDb.getContacts().length;

    res.json({
      status: 'online',
      uptime: Math.floor((Date.now() - startTime) / 1000),
      totalRequests: requestCount,
      contactCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to compile server statistics.' });
  }
};
