const express = require('express');
const router = express.Router();

const bot = require('../helpers/bot')
router.get('/test', async (req, res) => {
    res.status(200).json({ message: "succsess" })
})


module.exports = router;
