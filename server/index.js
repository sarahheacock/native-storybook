const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { getSrc } = require('./helpers/index.js');

const { checkCache, rewriteApp, updateCache } = require('./middleware/fileSystem.js');
const {
    buildApp,
    zipApp,
    updateAppetize,
} = require('./middleware/app');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
})
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../.out')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../.out/index.html'));
});

// app.get('/file', (req, res, next) => {
//     // we need to change the file that is returned 
// });

app.post('/bundle', (req, res, next) => {
    const { selectedKind, selectedStory } = req.body;
    res.locals.src = getSrc(selectedKind);
    res.locals.component = selectedKind.slice(selectedKind.indexOf('/') + 1);
    res.locals.cacheId = (selectedKind + selectedStory).replace(/ /g, '_');
    return next();
}, checkCache, rewriteApp, buildApp, zipApp, updateCache, updateAppetize, (req, res, next) => {
    return res.send('Hello');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Bundeling server listing on port ${port}`)
});

// const bundle = require('./scripts/bundle.js');

// const query = {selectedKind: "atoms/ButtonPrimary", selectedStory: "Unfocused with no icon"};
// const html = `<View>
//     <ButtonPrimary  title="button1" />
//     <ButtonPrimary  title="button2" />
//     <ButtonPrimary  title="button3" />
//     <ButtonPrimary  title="button4" />
//     <ButtonPrimary  title="button5" />
//     <ButtonPrimary  title="button6" />
// </View>`;


// bundle({ selectedKind: query.selectedKind, html });
