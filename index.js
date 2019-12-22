const program = require('commander');
var inquirer = require('inquirer');
const shelljs = require('shelljs');
const {generateRoute} = require('./generateRoute');

program.version('0.1.0');

if(!shelljs.test('-e', './package.json')){
    throw new Error('You must be in root')
}

program
    .option('-i, init <name>', 'init project <name>')
    .option('-gr, generate-route', 'generate route <name>');

program.parse(process.argv);

if (program.init) {
    const name = program.opts().init;
    console.log(name);

    shelljs.exec(`npx create-react-app ${name} --template poc`)
}

if(program.generateRoute){
    const name = program.opts();

    inquirer
        .prompt([
            {type: 'input', name: 'path', message: 'Route path', validate:(val)=>!!val.length},
            {type: 'input', name: 'component', message: 'Component name'},
        ])
        .then(answers => {
            const {path, component} = answers;
            generateRoute(path, component)
        });
}

