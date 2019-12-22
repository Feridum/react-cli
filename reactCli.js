const program = require('commander');
var inquirer = require('inquirer');
const shelljs = require('shelljs');
const {generateRoute} = require('./generateRoute');

program.version('0.1.0');

program
    .option('i, init <name>', 'init project <name>')
    .option('gr, generate-route', 'generate route <name>');

program.parse(process.argv);

if (program.init) {
    const name = program.opts().init;
    console.log(name);

    shelljs.exec(`npx create-react-app ${name} --template poc`)
}

if(program.generateRoute){

    if(!shelljs.test('-e', './package.json')){
        console.error('You must be in project root');
        process.exit(1);
    }

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

