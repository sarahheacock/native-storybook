const { command, makeid } = require('../helpers/index');
const { exec } = require('child_process');
const path = require('path');

const buildApp = (req, res, next) => {
    const { zipFileName } = res.locals;
    // do not
    if (zipFileName && req.body.cache) {
        return next();
    }

    const entry = path.resolve(__dirname, '../raw/index.js');
    const output = path.resolve(__dirname, '../../ios/build/Build/Products/Release-iphonesimulator/NativeDemo.app');
    const arg = `react-native bundle --platform ios --dev false --entry-file ${entry} --bundle-output ${output}/main.jsbundle --assets-dest ${output}`;
    
    return command(arg).then(message => {
        return next();
    }).catch(err => {
        console.log(err);
        return res.status(500).send(err);
    })
}

const zipApp = (req, res, next) => {
    const { zipFileName } = res.locals;
    if (zipFileName && req.body.cache) {
        return next();
    }

    const dest = path.resolve(__dirname, '../bundled');
    const origin = path.resolve(__dirname, '../../ios/build/Build/Products/Release-iphonesimulator/NativeDemo.app');
    const newFile = makeid(res.locals.cache);
    res.locals.newZipFileName = newFile;
    const zip = `tar -czf ${dest}/${newFile} ${origin}`;

    return command(zip).then(message => {
        return next();
    }).catch(err => {
        console.log(err);
        return res.status(500).send(err);
        // command rejects an error for 
        // return next();
    });
}

const updateAppetize = (req, res, next) => {
    console.timeEnd('bundle');
    console.time('post app');
    const { zipFileName } = res.locals;

    const publicKey = 'b4cr3m4kwxxckp0tpqcecqqw4c';
    const privateKey = 'tok_1dpnh543pekubar2xv5e8gtg0c';
    const filePath = path.resolve(__dirname, `../bundled/${zipFileName}`);
    const script = path.resolve(__dirname, '../scripts/request.sh');

    // NOTE: super hacky, but the process that runs the zip command exits before file finishes writing
    // so we set this buffer to make sure everything is truly done
    setTimeout(() => {
        exec(`sh ${script} ${publicKey} ${privateKey} ${filePath}`, {
            cwd: path.resolve(__dirname, '.')
        }, (error, stdout, stderr) => {
            if (error) {
                const err = `exec error: ${error}`;
                console.log(err);
                return res.status(500).send(err);
            }
    
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            console.timeEnd('post app');
            return next();
        })
    }, 5000);
}

module.exports = {
    buildApp,
    zipApp,
    updateAppetize,
}