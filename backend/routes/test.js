const express = require('express');
const router = express.Router();


// Simple public test route
router.get('/', (req, res) => {
res.json({ msg: 'FinanceEra backend is running' });
});


module.exports = router;