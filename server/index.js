// const express = require('express');
// const app = express();
// const bundle = require('./scripts/bundle.js');
// const path = require('path');

// app.use(express.static(path.resolve(__dirname, '../.out')));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../.out/index.html'));
// });

// app.get('/bundle', (req, res) => {
//     bundle();
//     res.send('Hello World');
// });

// const port = 3000;
// app.listen(port, () => {
//     console.log(`Bundeling server listing on port ${port}`)
// });

const bundle = require('./scripts/bundle.js');
bundle();
