const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')
const fs = require('fs')
var ncp = require('ncp').ncp
const glob = require("glob")

let SPECS = process.env.SPECS || process.argv[2]
const BROWSER = process.env.BROWSER || process.argv[3]
const ENV = process.env.ENV || process.argv[4]
const PHONE = process.env.PHONE || process.argv[5]
let phoneopts = {}

if (typeof PHONE !== 'undefined') {
  let models = JSON.parse(fs.readFileSync('./cypress/fixtures/phoneModels/models.json'))
  if (Object.prototype.hasOwnProperty.call(models, PHONE)) {
    phoneopts = {
      viewportWidth: models[PHONE].width,
      viewportHeight: models[PHONE].height,
      userAgent: models[PHONE].ua
    }
  }
}

// const PODINDEX = process.env.PODINDEX || null

// let specs = {};
// let pods = 2;
// let lastIndex = 0;
// let arrSpec = glob.sync("cypress/integration/**/*.js", {})

// if (!SPECS) {
//   for (let i = 0; i < pods; i++) {
//     let nextIndex = lastIndex + Math.floor(arrSpec.length / pods)
//     if (i === pods-1 && nextIndex !== arrSpec.length) {
//       specs[`pod${i}`] = arrSpec.slice(lastIndex, arrSpec.length)
//     } else {
//       specs[`pod${i}`] = arrSpec.slice(lastIndex, nextIndex)
//     }
//     lastIndex = nextIndex
//   }
  
//   SPECS = PODINDEX ? specs[`pod${PODINDEX}`] : []
// }

cypress.run({
  browser: BROWSER,
  headless: true,
  spec: SPECS,
  env: {
    configFile: ENV,
    ...phoneopts
  }
}).then((results) => {
  generateReport()

  if (fs.existsSync('./cypress/snapshots/actual')) {
    // normalize folder
    let folder = glob.sync("cypress/snapshots/actual/**/", {})
    
    folder.forEach(folderName => {
      let newName = especialCharMask(folderName)
      fs.renameSync(folderName, newName);
    });
    
    // normalize image name
    let image = glob.sync("cypress/snapshots/actual/**/**.png", {})

    image.forEach(file => {
      let newName = especialCharMask(file)
      fs.renameSync(file, newName);
    });

    ncp.limit = 2;

    ncp('./cypress/snapshots/actual', './mochawesome-report/assets', function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('done!');
    });
  }

  let json_result = {
    failures: results.totalFailed
  }
  let data = JSON.stringify(json_result);
  fs.writeFileSync('json_result.json', data);
}).catch((err) => {
  generateReport()
  console.error(err)
})

function generateReport(options) {
  return merge().then(report => marge.create(report))
}

function especialCharMask(especialChar) {
  especialChar = especialChar.replace(/[áàãâä]/g, 'a');
  especialChar = especialChar.replace(/[éèêë]/g, 'e');
  especialChar = especialChar.replace(/[íìîï]/g, 'i');
  especialChar = especialChar.replace(/[óòõôö]/g, 'o');
  especialChar = especialChar.replace(/[úùûü]/g, 'u');
  especialChar = especialChar.replace(/[ç]/g, 'c');
  especialChar = especialChar.replace(/_+/g, '_');
  especialChar = especialChar.replace(/["?Ì§Ì]/g, '');
  especialChar = especialChar.replace(/[\u0083]/g, '');
  especialChar = especialChar.replace(/[\u0081]/g, '');
  return especialChar;
}