// noinspection DuplicatedCode
const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const _ = require('lodash');
const handlebars = require("handlebars");
const pagesDirectory = path.join('components', 'onboarding');
const output = path.join('site', 'onboarding');

(async () => {
    // Register some custom handlebar helpers that are used in the template
   registerHelpers(handlebars)
    // Ensure directories
    await fs.ensureDir(output)
    // Global settings
    const globalProductionJson = await getGlobalConfig('production')
    const globalDevelopmentJson = await getGlobalConfig('development')


    // Load the Handlebars template
    const templateSource = await fs.readFile(path.join('templates', 'onboarding-template.hbs'), 'utf8');
    const scriptSource = await fs.readFile(path.join('templates', 'onboarding-scripts.html'), 'utf8');
    const template = Handlebars.compile(templateSource);

    // Read all files in the components directory
    const files = await fs.readdir(pagesDirectory);

    // Filter JSON files
    const jsonFiles = files.filter(file => path.extname(file) === '.json' && isNotSystemFiles(file));

    // Loop through the JSON files and generate the HTML files
    for (const jsonFileName of jsonFiles) {
        console.log(`\n\n Working on ${jsonFileName}`)
        const jsonFile = await fs.readJson(path.join(pagesDirectory, jsonFileName))
        // We want to support multiple environment. Here we are checking the different environments
        // and if they are set and enabled. If not we generate the template from just the json page source.
        if((globalProductionJson && globalProductionJson.enabled )|| (globalDevelopmentJson && globalDevelopmentJson.enabled)){
            if(globalProductionJson && globalProductionJson.enabled){
                console.log(`Creating ${jsonFile.filename} with production configuration`)
                await createTemplateFile(jsonFile, globalProductionJson, jsonFile.filename, template, scriptSource)
            }
            if(globalDevelopmentJson && globalDevelopmentJson.enabled){
                console.log(`Creating ${jsonFile.filename}-development with development configuration`)
                await createTemplateFile(jsonFile, globalDevelopmentJson, jsonFile.filename + "-development", template, scriptSource)
            }
        } else {
            console.log(`Creating ${jsonFile.filename} without any environment`)
            await createTemplateFile(jsonFile, {}, jsonFile.filename, template, scriptSource)
        }
    }
})();

async function getGlobalConfig(mode){
    const jsonPath = path.join(pagesDirectory, `global-${mode}.json`)
    if(await fs.pathExists(jsonPath)){
        console.log("Reading global configuration in " + jsonPath);
        return await fs.readJson(jsonPath);
    }
    console.log("No global data found. Using page configuration only");
    return null
}

async function createTemplateFile(jsonFile, globalJson, targetFileName, template, scriptSource){
    const jsonData = _.merge({}, globalJson, jsonFile);
    const filePath = path.join(output, `${targetFileName}.html`)

    console.log(`Writing to file ${targetFileName}.html`)
    // Generate the HTML content using the Handlebars template and JSON data
    const htmlContent = `${template(jsonData)} ${scriptSource}`;
    // Write the generated HTML content to a file
    await fs.writeFile(filePath, htmlContent);

    console.log(`Generated ${filePath}`);
}
function isNotSystemFiles(file)
{
    return file !== 'global-production.json' && file!=='global-development.json' && file !== 'template-settings.json'
}


function registerHelpers(Handlebars){
    Handlebars.registerHelper('empty', function (value, options) {
        if (!value) { return options.fn(this); }
        return value.replace(/\s*/g, '').length === 0
            ? options.fn(this)
            : options.inverse(this);
    });
    Handlebars.registerHelper('not-empty', function (value, options) {
        // Return true if value is not null, undefined, or a string with only whitespace characters
        if (value && value.trim().length > 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });
    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });
}