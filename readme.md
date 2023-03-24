# Skandia Web Components

Skandia Web Components is a project for generating components to be used on external providers, like Squarespace as pr. today.
The following technologies are being utilized for making this happen:
* NodeJs > 14
* Handlebars.js (Template compilation)
* Lodash (json settings merge)
* tailwindcss (styling of components)
* postcss (compiling of styling sources)
* http-server w. expressjs (for running components locally)

## Usage
This project can be built and used multiple ways. Here are a couple:
### Terminal
Navigate to the project root, where the package.json is located. Run npm run <desired command>
Example for building everything
`npm run build`
You can see in the package.json available commands, but as of this document you can use:
* build
* build-css
* build-pages
* debug

#### Debug
Debug runs a small http static serving server. Usage here is 
`https://<see terminal for url>:<port>/?page=<page>`
Example
`https://localhost:44236/?page=elkompis` this will load component located in /site/elkompis.html

### IDE
In VSCode, WebStorm etc there is built in tools for running the different commands. If you are using one of these products i guess you already know how.

### Manually 
You can run all commands locally, just do what package.json does. 
Example to generate pages
`node generate.json`


# Structure
Structure of this project is important, especially under ./site directory. 
This is where both template, scripts and build process is using files.
Do not restructure or change names unless you also do this in the source, ex (css for images,icons)

# Templates
In ./templates we have our templates files. They are suffixed with hbs that are handlebar extension. 
Changes to this file will change the generated output from `npm run build` & `npm run build-pages` to reflect the template changes. 
We also have a .html file that is manually appended to the generated output and contains script templates.
TODO: Remove the script template file, its not needed if we rewrite the js search/replace logic.

# External providers usage
How can we use this in Squarespace that is our cms provider at this time. 
In Squarespace, or other vendor, create a code block (or a block that can take some html code).
In this block add `<div id="onboarding" data-page="hyttestrom"></div>`
If everything is setup correctly it should load the form names hyttestrom.html that you see in ./site.
Change this name to whatever you want in the ./site folder (NB must be available in production, so pushed out).

For this to work we use global code injection to inject the following files (in this order) located in ./site.
* output.css
* ./assets/loadPage.js
* ./assets/js/common.js
* ./assets/js/onboarding-validate.js
* ./assets/js/onboarding-api.js
* ./assets/js/onboarding.js

If done correctly you should have a functional form on your page.

## Vipps
NB: For vipps to work the page url must be a valid vipps return url. Ask IT. 

# New Pages
In the ./pages directory we have one .json file for each form. This can be different colors, different text etc. 
The content of the files are seperated by steps. These steps reflect the physical steps the user has to take to make it more clear what information you are providing.
So, lets say you need a new Skandia Energi form. Copy an existing one "hyttestrom.json" and make the changes needed.

### Important properties
We do have some required fields in the .json file. 
* filename
* profile 

Profile controls the color scheme and must be equal to what is defined in tailwind.config.js.
As of today we have the following schemes available
* ElKompis (default)
* SkandiaEnergi
NB: Profile names are case sensetive!

If you need a new schema, copy an existing under "Themes" in tailwind.config.js and use the name given in your page config file. 