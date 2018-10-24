const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const cacheFiles = true;

const getSrc = () => {
    // TODO
    return path.resolve(__dirname, '../../src/atoms/TextArea');
};

const getProps = () => {
    // TODO
    return { text: 'bye' };
};

// ====================FILE WRITING======================
const searchAndReplace = (divider, str, newStr) => {
    const arr = str.split(divider);
    if (arr.length === 3) {
        arr[1] = newStr;
    }
    return arr.join(divider);
}

const readApp = (appPath) => (
    new Promise((res, rej) => {
        fs.readFile(appPath, (err, data) => {
            if(err) {
                return rej(err);
            }
            return res(`${data}`)
        });
    })
);

const writeApp = (appPath, str) => (
    new Promise((res, rej) => {
        fs.writeFile(appPath, str, (err) => {
            if (err) {
                return rej(err);
            }
            return res('success');
        })
    })
);

const rewriteApp = ({ src, props }) => {
    const appPath = path.resolve(__dirname, '../raw/App.tsx');
    
    return readApp(appPath).then(text => {
        const newComp = '/* NEWCOMP */';
        const newProps = '/* NEWPROPS */';
        const strWithNewComp = searchAndReplace(newComp, text, `import MyComponent from '${src}';`);
        const strWithNewProps = searchAndReplace(newProps, strWithNewComp, `const myProps = ${JSON.stringify(props, null, 4).replace(/\"([^(\")"]+)\":/g,"$1:")};`)
        return writeApp(appPath, strWithNewProps);
    })
    // .then(m => {
    //     console.log(m)
    // }).catch(err => {
    //     console.log(err);
    // });
};

// ===============BUNDLE======================================
const command = (args) => {
    return new Promise((res, rej) => {
        const arr = args.split(' ');
        const shell = spawn(arr[0], arr.slice(1));
        let output = '';

        shell.stdout.on('data', (data) => {
            // console.log(`stdout: ${data}`);
            output += data;
        });

        shell.stderr.on('data', (data) => {
            return rej(`${data}`);
        });

        shell.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            return res(output);
        });
    });
}

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

const bundleAndZip = ({ src, props }) => {
    // check cache for bundled file
    const cachePath = path.resolve(__dirname, '../bundled/cache.json');
    const key = `${src}${JSON.stringify(props)}`;
    let cache;
    let val;
    let newPath;

    return readApp(cachePath).then(text => {
        cache = JSON.parse(text);
        val = cache[key];

        if (val && cacheFiles) {
            return Promise.resolve();
        }

        newPath = makeid(cache);
        console.log(newPath);
        // return command('react-native run-ios --configuration Release');
        const entry = path.resolve(__dirname, '../raw/index.js');
        const output = path.resolve(__dirname, '../../ios/build/Build/Products/Release-iphonesimulator/NativeDemo.app');
        const arg = `react-native bundle --platform ios --dev false --entry-file ${entry} --bundle-output ${output}/main.jsbundle --assets-dest ${output}`;
        console.log(arg);
        return command(arg)
    }).then(data => {
        // console.log(data);
        if (val && cacheFiles) {
            return Promise.resolve();
        }
        
        console.log(path.resolve(__dirname, '../bundled/' + newPath));
        return command(`tar -czf ${path.resolve(__dirname, '../bundled/' + newPath)} ${path.resolve(__dirname, '../../ios/build/Build/Products/Release-iphonesimulator/*.app')}`)
    })
    // .catch(err => {
    //     console.log(err);
    // });
    // if cached, return path
    // if not, bundle files
    // zip files and move zip into bundled directory with randomly generated filename
    // update cache record
}

// ==============SIMULATOR====================================
const updateAppetize = (newFile) => {

}

// =========================================================
const bundle = () => {
    // determine src point
    const src = getSrc();
    // get new props
    const props = getProps();

    // update App.tsx with new src
    // update App.tsx with new props
    rewriteApp({ src, props }).then(m => {
        return bundleAndZip({ src, props })
    }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });

    // if not cached, rebundle from src point
    // zip files and place in cache
    // const bundledPath = bundleAndZip({ src, props });

    // curl zipped files to appetize
    // return curl output
    // return updateAppetize(bundledPath);
};

module.exports = bundle;