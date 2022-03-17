const app = require('express')();

app.post('/api', (req, res) => {
    const path = '/api/send';
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
});

module.exports = app;