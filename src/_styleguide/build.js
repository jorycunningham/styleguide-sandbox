
var config = require('../../config');
var Metalsmith = require('metalsmith');
var ms_Assets = require('metalsmith-assets');
var ms_Collections = require('metalsmith-collections');
var ms_InPlace = require('metalsmith-in-place');
var ms_JSONtoFiles = require('metalsmith-json-to-files')
var ms_Layouts = require('metalsmith-layouts');
var ms_Paths = require('metalsmith-paths')
var ms_Permalinks = require('metalsmith-permalinks');
var util = require('util');

var FileDump = function(files, metalsmith, done) {
    console.log(util.inspect(files, false, null));
    done();
};



var buildFolder = config.dist;
var jsonData = 'data/';


Metalsmith(__dirname)

 .use(ms_JSONtoFiles({
         'source_path': jsonData
     }))


    // establishes content special content types
     .use(ms_Collections({
                    
     }))


      // allows for the use of dust tags in all files, not just templates
     .use(ms_InPlace({
            engine: 'dust'
      }))

    // creates permalinks
     .use(ms_Paths({
        property: "path"
      }))

    // debugging feature comment/uncomment to see data dump in console.
       //.use(FileDump)

     // assigns a layout engine
      .use(ms_Layouts({
            engine: 'dust',
            directory: '_layouts',
            default: 'master-layout.dust',
  
            partials: '_layouts/partials/'
      }))


      // copies static assets from outside src folder into build folder on build

      .use(ms_Assets(
        {
             source: './resources', // relative to the working directory
             destination: './resources' // relative to the build directory
        }
      ))

      .destination('../../'+ buildFolder)


      // build it!
     .build(function(err) {

            if (err) {
                console.log(err);
            } else {
              console.log('Build Completed');
            }
    });

   
