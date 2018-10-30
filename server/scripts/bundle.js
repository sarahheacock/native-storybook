const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const cacheFiles = true;

const getSrc = (selectedKind) => {
    // TODO
    return path.resolve(__dirname, `../../src/${selectedKind}`);
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

const rewriteApp = ({ src, props, compName }) => {
    const appPath = path.resolve(__dirname, '../raw/App.tsx');
    
    return readApp(appPath).then(text => {
        const newComp = '/* NEWCOMP */';
        const newProps = '{/* NEWPROPS */}';
        const strWithNewComp = searchAndReplace(newComp, text, `import ${compName} from '${src}';`);
        const strWithNewProps = searchAndReplace(newProps, strWithNewComp, props)
        return writeApp(appPath, strWithNewProps);
    })
    // .then(m => {
    //     console.log(m)
    // }).catch(err => {
    //     console.log(err);
    // });
};

// ==============SIMULATOR====================================
const updateAppetize = (newFile) => {
    console.log('NEW FILE', newFile);
    // curl https://APITOKEN@api.appetize.io/v1/apps -F "file=@file_to_upload.zip" -F "platform=ios"
    const filePath = path.resolve(__dirname, `../bundled/${newFile}`);
    const key = '7ngm2qqmwybqx0z8zgdhhwn0km';
    const token = 'private_c311wb7pznhbkzpbtz943wqb0w';
    return command(`curl https://${token}@api.appetize.io/v1/apps/${key} -F "file=@${filePath}" -F "platform=ios"`)
}

// ===============BUNDLE======================================
const command = (args, message) => (
    new Promise((res, rej) => {
        console.log(message);
        const arr = args.split(' ');
        const shell = spawn(arr[0], arr.slice(1));
        let output = '';

        shell.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            output += data;
        });

        shell.stderr.on('data', (data) => {
            rej(`${data}`);
        });

        shell.on('close', (code) => {
            res(message);
            console.log(`child process exited with code ${code}`);
            // return res(output);
        });
    })
)

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

let newPath;
// creates a bundled jsx transpiled js file
// react-native bundle --platform ios --dev false --entry-file server/raw/index.js --bundle-output ios/build/Build/Products/Release-iphonesimulator/NativeDemo.app/main.jsbundle --assets-dest ios
const bundleAndZip = ({ src, props }) => {
    // check cache for bundled file
    const cachePath = path.resolve(__dirname, '../bundled/cache.json');
    // const key = `${src}${JSON.stringify(props)}`;
    const key = 'foo';
    let cache;
    let val;

    return readApp(cachePath).then(text => {
        cache = JSON.parse(text);
        val = cache[key];

        if (val && cacheFiles) {
            return Promise.resolve();
        }

        newPath = makeid(cache);
        // console.log(newPath);
        // return command('react-native run-ios --configuration Release');
        const entry = path.resolve(__dirname, '../raw/index.js');
        const output = path.resolve(__dirname, '../../ios/build/Build/Products/Release-iphonesimulator/NativeDemo.app');
        const arg = `react-native bundle --platform ios --dev false --entry-file ${entry} --bundle-output ${output}/main.jsbundle --assets-dest ${output}`;
        // const arg = 'react-native --help';
        // console.log(arg);
        return command(arg)
    }).then(m => {
        const dest = path.resolve(__dirname, '../bundled');
        const origin = path.resolve(__dirname, '../../ios/build/Build/Products/Release-iphonesimulator/NativeDemo.app')
        const zip = `tar -czf ${dest}/${newPath} ${origin}`;
        // console.log(zip, newPath, m);
        return command(zip, newPath);
    }).catch(err => {
        console.log(err);
    }).then(m => {
        console.log(m);
        return updateAppetize(newPath);
    })

    // if cached, return path
    // if not, bundle files
    // zip files and move zip into bundled directory with randomly generated filename
    // update cache record
}

// =========================================================
// TODO:
// (1) rearrange atom files
// (2) see if storybook and storybook static can handle the view tags
// (3) better understand cli
// (4) finish writing compile script for build time
const bundle = (query, html) => {
    // determine src point
    const { selectedKind } = query;
    const src = getSrc(selectedKind);
    // get new props
    // const props = getProps();
    const props = html;
    const compName = selectedKind.slice(selectedKind.indexOf('/') + 1)

    // update App.tsx with new src
    // update App.tsx with new props
    rewriteApp({ src, props, compName }).then(m => {
        return bundleAndZip({ src, props })
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