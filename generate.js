const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const pagesDirectory = "pages";
const output = "site";
(async () => {
    Handlebars.registerHelper('empty', function (value, options) {
        if (!value) { return options.fn(this); }
        return value.replace(/\s*/g, '').length === 0
            ? options.fn(this)
            : options.inverse(this);
    });
    Handlebars.registerHelper('not-empty', function (value, options) {
        if (!value) { return options.fn(this); }
        return !(value.replace(/\s*/g, '').length === 0
            ? options.fn(this)
            : options.inverse(this));
    });


    // Load the Handlebars template
    const templateSource = await fs.readFile('./templates/onboarding-template.hbs', 'utf8');
    const scriptSource = await fs.readFile('./templates/onboarding-scripts.html', 'utf8');
    const template = Handlebars.compile(templateSource);

    // Read all files in the pages directory
    const files = await fs.readdir(pagesDirectory);

    // Filter JSON files
    const jsonFiles = files.filter(file => path.extname(file) === '.json');

    // Loop through the JSON files and generate the HTML files
    for (const jsonFile of jsonFiles) {
        console.log(`trying to read ${pagesDirectory}/${jsonFile}, ${path.join(pagesDirectory, jsonFile)}`)
        const jsonData = await fs.readJson(path.join(pagesDirectory, jsonFile));
        const filePath = path.join(output, `${jsonData.filename}.html`)
        console.log(`Writing to file ${jsonData.filename}.html`)
        // Generate the HTML content using the Handlebars template and JSON data
        const htmlContent = `${template(jsonData)} ${scriptSource}`;

        // Write the generated HTML content to a file
        await fs.writeFile(filePath, htmlContent);

        console.log(`Generated ${filePath}`);
    }

    // // Load the Handlebars template
    // const templateSource = await fs.readFile('onboarding-template.hbs', 'utf8');
    // const template = Handlebars.compile(templateSource);
    //
    // // Load the JSON data
    // const files = await fs.readdir(pagesDirectory);
    // const validFiles = files.filter(file => path.extname(file) === '.json');
    // console.log("Valid files " + validFiles )
    // const jsonFiles = validFiles.map(async file =>{
    //     console.log("Reading json for file " + file)
    //     return await fs.readJson(path.join(pagesDirectory, file));
    // } );
    //
    // fs.ensureDir(output)
    //     .then(async () => {
    //         console.log("Writing new files to " + output);
    //       //  const configurations = await fs.readJson(path.join(pagesDirectory, jsonFile));
    //         // Loop through the configurations and generate the HTML files
    //         for (const config of jsonFiles) {
    //             const renderedHtml = template(config);
    //             await fs.writeFile(path.join(output, config.filename), renderedHtml);
    //             console.log(`Generated ${config.filename}`);
    //         }
    //     })
    //     .catch(err => {
    //         console.log("Could not create or ensure ./site. ", err);
    //     })
})();