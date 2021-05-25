// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin');
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
    const pathToConfigFile = path.resolve('.', 'cypress', 'config', `${file}.json`);

    return JSON.parse(fs.readFileSync(pathToConfigFile));
}

module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
            launchOptions.args.push('--disable-dev-shm-usage');
        }

        return launchOptions;
    });

    getCompareSnapshotsPlugin(on);

    const file = config.env.configFile || 'hml';
    let configFile = getConfigurationByFile(file);

    if (typeof config.env.userAgent !== 'undefined') {
        configFile = {
            viewportWidth: config.env.viewportWidth,
            viewportHeight: config.env.viewportHeight,
            userAgent: config.env.userAgent,
            ...configFile,
        };
    }

    return configFile;
};
// `on` is used to hook into various events Cypress emits
// `config` is the resolved Cypress config
// on('before:browser:launch', (browser = {}, args) => {
//   if (browser.name === 'chrome') {
//     args.push('--disable-dev-shm-usage')
//     return args
//   }
//   return args
// })
