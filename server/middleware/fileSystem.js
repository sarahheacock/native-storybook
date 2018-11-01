const { readFile, writeFile, searchAndReplace, getSrc } = require('../helpers/index.js');
const { updateAppetize } = require('./app');
const path = require('path');

const cachePath = path.resolve(__dirname, '../bundled/cache.json');

const checkCache = (req, res, next) => {
    // if static, we just check for file. If file not available, send error to front end
    // if cache, check for file. If file not available, create file
    console.time('bundle');
    const { static, cache } = req.body;
    const { cacheId } = res.locals;


    // we have to reread the cache everytime since we write to
    // json imported through 'require' are cached and will not update with rewrite
    return readFile(cachePath).then(file => {
        const json = JSON.parse(file);
        res.locals.cache = json;
        res.locals.zipFileName = json[cacheId];

        if (!static && !cache) {
            return next();
        }

        if (static && !json[cacheId]) {
            const err = new Error('File not available');
            console.log(err);
            return res.status(500).send(err);
        }

        return next();
    }).catch(err => {
        console.log(err);
        return res.status(500).send(err);
    })
}

const rewriteApp = (req, res, next) => {
    const appPath = path.resolve(__dirname, '../raw/App.tsx');
    const { component, src, zipFileName } = res.locals;
    // do not need to rewrite if cached
    if (zipFileName && req.body.cache) {
        return next();
    }
    
    return readFile(appPath).then(text => {
        const newComp = '/* NEWCOMP */';
        const newProps = '/* NEWPROPS */';
        const strWithNewComp = searchAndReplace(newComp, text, `import { ${component} } from '${src}';`);
        const strWithNewProps = searchAndReplace(newProps, strWithNewComp, `return ( ${req.body.html} );`)
        return writeFile(appPath, strWithNewProps);
    }).then(message => {
        return next();
    }).catch(err => {
        console.log(err);
        return res.status(500).send(err);
    });
}

const updateCache = (req, res, next) => {
    const { cacheId, zipFileName, newZipFileName } = res.locals;
    if (zipFileName && req.body.cache) {
        return next();
    }

    const json = JSON.stringify({
        ...res.locals.cache,
        [cacheId]: newZipFileName
    }, null, 4);

    // TODO: remove file
    // TODO: cacheing is totally messed up
    // use this zipFileName to 
    res.locals.zipFileName = newZipFileName
    console.log(json);

    return writeFile(cachePath, json).then(m => {
        return next();
    }).catch(err => {
        console.log(err);
        return res.status(500).send(err);
    });
}

module.exports = {
    checkCache,
    rewriteApp,
    updateCache,
}