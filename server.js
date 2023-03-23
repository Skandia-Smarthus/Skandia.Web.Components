const https = require('https');
const express = require('express');
const { readFileSync } = require('fs');
const { createServer } = require('http');
const selfsigned = require('selfsigned');

const app = express();
const port = 44326;

app.use(express.static('.'));

const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365 });

const server = https.createServer(
    {
        key: pems.private,
        cert: pems.cert,
    },
    app
);

// Start the server
server.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});