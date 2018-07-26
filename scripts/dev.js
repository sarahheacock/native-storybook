// Loading dependency graph, done.
// storybook start -p 7007
// react-native run-ios

const { spawn } = require('child_process');
const chalk = require('chalk');

function createPromise(arg, done){
    console.log(chalk.cyan(arg));

    const myPromise = new Promise((res, rej) => {
        let arr = arg.split(' ');
        const first = arr.splice(0, 1)
        const command = spawn(first[0], arr);

        command.stdout.on('data', (data) => {
            const d = `${data}`
            if(done && d.includes(done)){
                res(d);
            }
            else {
                console.log(d);
            }
        })

        command.stderr.on('data', (data) => {
            console.log(chalk.red(`${data}`))
            // rej(`${data}`)
        })

        command.on('exit', (code) => {
            const message = `Child exited with code ${code}`;
            res(message);
        });
    })

    return myPromise;
}

const startStoryBook = createPromise("storybook start -p 7007", "Loading dependency graph, done.");

startStoryBook.then(m => {
    console.log(chalk.green(m));
    return createPromise("react-native run-ios")
}).then(m => {
    console.log(chalk.green(m));
    return createPromise("open http://localhost:7007");
}).then(m => {
    console.log(chalk.green(m));
}).catch(err => {
    console.log(chalk.red(err))
})