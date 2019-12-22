const shelljs = require('shelljs');
const fs = require('fs');

const generateRoute = (path, componentName) => {
    const component = componentName.charAt(0).toUpperCase() + componentName.substring(1);

    const newRoute = `\t{
        path: '${path}',
        component: ${component}Container,
        exact: false
    },
];
`;

    fs.readFile('./routes.ts', 'utf8', (err, data) => {
        let response = data;
        response = response.replace(/^];?$/gm, newRoute);
        response = response.replace(/(?<=(import.+))'\n\n/gm, `\nimport { ${component}Container } from 'screens/${component}Container'\n\n`);

        fs.writeFile('./routes.ts', response, (err) => {
            if (err) throw err;
        })
    });


    shelljs.mkdir('-p', `./screens/${component}`);
    shelljs.cp('-f', './templates/Component.tsx', `./templates/Component_copy.tsx`);
    shelljs.cp('-f', './templates/Container.tsx', `./templates/Container_copy.tsx`);
    shelljs.mv('-f', './templates/Component_copy.tsx', `./screens/${component}/${component}.tsx`);
    shelljs.mv('-f', './templates/Container_copy.tsx', `./screens/${component}/${component}Container.tsx`);


    shelljs.sed('-i', /COMPONENT_NAME/gm, component, `./screens/${component}/${component}.tsx`);
    shelljs.sed('-i', /COMPONENT_NAME/gm, component, `./screens/${component}/${component}Container.tsx`);
};


module.exports = {
    generateRoute,
}

