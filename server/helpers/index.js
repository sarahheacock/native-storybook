// const cache = require('../bundled/cache.json');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const getSrc = (selectedKind) => {
    // TODO
    return path.resolve(__dirname, `../../src/${selectedKind}`);
};

const makeid = (cache) => {
    const arr = [];
    const start = 'A';
    const diff = start.charCodeAt(0);

    for (let i = 0; i < 7; i++) {
        const num = Math.floor(Math.random() * 26) + diff;
        arr.push(String.fromCharCode(num));
    }

    const id = arr.join('') + '.tar.gz';
    if (cache[id]) {
        return makeid(cache);
    }
    return id;
}

const searchAndReplace = (divider, str, newStr) => {
    const arr = str.split(divider);
    if (arr.length === 3) {
        arr[1] = newStr;
    }
    return arr.join(divider);
}

const readFile = (appPath) => (
    new Promise((res, rej) => {
        fs.readFile(appPath, (err, data) => {
            if(err) {
                return rej(err);
            }
            return res(`${data}`)
        });
    })
);

const writeFile = (appPath, str) => (
    new Promise((res, rej) => {
        fs.writeFile(appPath, str, (err) => {
            if (err) {
                return rej(err);
            }
            return res('success');
        })
    })
);

const command = (args) => (
    new Promise((res, rej) => {
        const arr = args.split(' ');
        const run = spawn(arr[0], arr.slice(1));
        let output = '';
        let err = '';

        run.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            output += data;
        });

        run.stderr.on('data', (data) => {
            err += data;
        });

        run.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            if (code) {
                return rej(err);
            }
            return res(output);
        });
    })
)

module.exports = {
    getSrc,
    makeid,
    searchAndReplace,
    readFile,
    writeFile,
    command,
}