const express = require('express');
const router = express.Router();

// POST /api/user/settings
router.put('/settings', (req, res) => {
  const settings = req.body;
  console.log('Received settings:', settings);

  // Here you could save settings to DB
  res.json({ success: true, message: 'Settings saved successfully' });
});

module.exports = router;
