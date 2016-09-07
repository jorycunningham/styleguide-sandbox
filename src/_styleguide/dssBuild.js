var dss = require('dss');
var fs = require('fs');
var _lo = require('lodash');
var config = require('../../config');

var styleDataFile = config.styleDataFile;
var styleSource = config.componentCSSFile;


// Defines fields beyond the standard fields in DSS (see: https://github.com/DSSWG/DSS)

var customFields = [
        'group',
        'displayName',
        'exampleLocation'
];



/**
* utitlity function to create JSON file from parsed data
* @param {string} dataAsJson - json object parsed to string
* @param {string} path - path relative to project root where the files should be written
*/
var writeJsonFile = function(dataAsJson, path){
  
      if (dataAsJson) {

             fs.writeFile(path, dataAsJson, function(error) {
                if (error) {
                  console.error("Error while writing "+ path +": " + error.message);
                } else {
                  console.log("Successfully wrote data to " + path);
                }
              });

      } else {

        console.error("Error while parsing "+ path +" to JSON: " + error.message);
      }

      return true;
  };


/**
* The core DSS parsing of a CSS file
* @param {string} styleSource - location of source CSS file to be parsed
*/

var writeStyleGuideData = fs.readFileSync(styleSource),
          
      options = {},

      callback = function(parsed){
        // data is wrapped in a "blocks" wrapper by DSS, stripping that out and stringifying it
        var data = parsed.blocks;
        // make sure all objects have name. this also filters out accidental entries.
        data = _lo.filter(data, 'name'); 
        data = _lo.sortBy(data, 'name');
        var dataAsJson = JSON.stringify(data);

            
        // write a file with ALL styles
        writeJsonFile(dataAsJson, styleDataFile);

      };

      // register custom fields 
      if (customFields.length){

          customFields.forEach(function(fieldName) {
               dss.parser( fieldName, function (i, line, block ) {
                  return line;
                });
          });
      }

      // process input file with DSS

      dss.parse(writeStyleGuideData, options, callback);


