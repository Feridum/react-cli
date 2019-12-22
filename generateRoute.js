const shelljs = require('shelljs');
const fs = require('fs');

const generateRoute = (path, componentName) => {
    const component = componentName.charAt(0).toUpperCase() + componentName.substring(1);

    const newRoute = `    {
        path: '${path}',
        component: ${component}Container,
        exact: true,
    },
];
`;

    fs.readFile('./src/navigation/routes.ts', 'utf8', (err, data) => {
        let response = data;
        response = response.replace(/^];?$/gm, newRoute);
        response = response.replace(/(?<=(import.+))'(\n\n|\r\n\r\n)/gm, `'\nimport { ${component}Container } from 'screens/${component}/${component}Container'\n\n`);

        fs.writeFile('./src/navigation/routes.ts', response, (err) => {
            if (err) throw err;
        })
    });


    shelljs.mkdir('-p', `./src/screens/${component}`);
    shelljs.cp('-f', `${__dirname}/templates/Component.tsx`, `${__dirname}/templates/Component_copy.tsx`);
    shelljs.cp('-f', `${__dirname}/templates/Container.tsx`, `${__dirname}/templates/Container_copy.tsx`);
    shelljs.mv('-f', `${__dirname}/templates/Component_copy.tsx`, `./src/screens/${component}/${component}.tsx`);
    shelljs.mv('-f', `${__dirname}/templates/Container_copy.tsx`, `./src/screens/${component}/${component}Container.tsx`);


    shelljs.sed('-i', /COMPONENT_NAME/gm, component, `./src/screens/${component}/${component}.tsx`);
    shelljs.sed('-i', /COMPONENT_NAME/gm, component, `./src/screens/${component}/${component}Container.tsx`);
};


module.exports = {
    generateRoute,
}

