const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.sendStatus(200);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;