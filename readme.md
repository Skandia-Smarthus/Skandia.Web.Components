# Skandia Web Components

Skandia Web Components is a project for generating components to be used on external providers, like Squarespace as pr. today.
The following technologies are being utilized for making this happen:
* NodeJs > 14
* Handlebars.js (Template compilation)
* Lodash (json settings merge)
* tailwindcss (styling of components)
* postcss (compiling of styling sources)
* http-server w. expressjs (for running components locally) - debugging

## Usage
This project can be built and used multiple ways. Here are a couple:
### Terminal
Navigate to the project root, where the package.json is located. Run npm run <desired command>
Example for building everything
`npm run build`
You can see in the package.json available commands, but as of this document you can use:
* build
* build-css
* build-onboarding
* build-strompris
* debug

#### Debug
Debug runs a small http static serving server. Usage here is 
`https://<see terminal for url>:<port>/?page=<page>`
Example
`https://localhost:44236/?page=elkompis` this will load component located in /site/elkompis.html

### IDE
In VSCode, WebStorm etc there is built in tools for running the different commands. If you are using one of these products i guess you already know how.

### Manually 
You can run all commands locally. Check package.json for all available commands and how to run them. 
Example to generate pages
`node ./build/generate-onboarding.json`
`node ./build/generate-strompris.json`

# Structure
Structure of this project is important, especially under ./site directory. 
This is where the definitions for the components to be built are located.
All static assets related to components is placed under ./site/assets. 
All generated files are located under ./site/<type>/<name>.html

# Templates
In ./templates we have our templates files. They are suffixed with hbs that are handlebar extension. 
Changes to this file will change the generated output from `npm run build` & `npm run build-onboarding` to reflect the template changes. 
We also have a .html file that is manually appended to the generated output and contains script templates.
TODO: Remove the script template file, its not needed if we rewrite the js search/replace logic.

# External providers usage
How can we use this in Squarespace that is our cms provider at this time. 
In Squarespace, or other vendor, create a code block (or a block that can take some html code).
In this block add `<div id="onboarding" data-form="hyttestrom"></div>`
If everything is setup correctly it should load the form names hyttestrom.html that you see in ./site/onboarding.
Change this name to whatever you want in the ./site/onboarding folder (NB must be available in production, so pushed out).

Its the same for strompris. 
`<div id="strompris" data-price="elkompis"></div>`
This will load the strompris component for elkompis.

For this to work we use, in squarespace, global code injection to inject the following files (in this order) located in ./site.
* ./assets/output.css
* ./assets/loadPage.js - this is important as it will load the correct component based on the data-form/price attribute.
* ./assets/js/common.js
* ./assets/js/onboarding-validate.js
* ./assets/js/onboarding-api.js
* ./assets/js/onboarding.js
* ./assets/js/strompris.js

If done correctly you should have a functional form on your page. When using on other providers than squarespace you need to make sure all the files above is loaded on the page.

## Vipps
NB: For vipps to work the page url must be a valid vipps return url. Ask IT. 

# New Pages
In the ./pages directory we have one .json file for each component. 
This can be different colors, different text etc. 
The content of the files are seperated by steps in the onboarding forms, and one level for strompris.
These steps in the onboarding form reflect the physical steps the user has to take to make it more clear what information you are providing.
So, lets say you need a new onboarding form for Skandia Energi. Copy an existing one "hyttestrom.json" in the onbording folder and make the changes needed.
When you're happy with the changes, run `npm run build-onboarding` and you should see a new file in ./site/onboarding named "skandiaenergi.html".
Same with strompris. Copy an existing file in ./pages/strompris, make the change and run `npm run build-strompris`. This will create a new file in .site/strompris with the name selected.

### Important properties
We do have some required fields in the .json file. 
* filename
* profile 

Profile controls the color scheme and must be equal to what is defined in tailwind.config.js.
As of today we have the following schemes available
* ElKompis (default)
* SkandiaEnergi
NB: Profile names are case sensetive!

If you need a new theme, copy an existing theme under "Themes" in tailwind.config.js and use the `name` given in your page config file as the new profile name.

## Deploy
When changes have been made you need to push them to the main repo. When this is done a build process is started in Azure DevOps.
This will re-generate the components and css before pushing all content under ./site to Azure Storage so they can be served publicly. 

## I have an error
### Some new icons does not show up locally
If you have copied an existing like for an icon in the icon.css file it must link to the publicly available Azure Storage container so it works when deployed.
If you run this locally and its not deployed yet, you will get a 404 error. Deploy the new icon or image and try again, alternatively change the path for the icon/image, but remember to change back to the Azure Storage url before deploy.

### Component does not load externally
Check that is has been deployed first. If so check devtools for errors as it should list something useful. There is probarly either a error in the new .json document that erupts the build process, aka its not deployed.
Also check the div tag for the correct naming and type. 