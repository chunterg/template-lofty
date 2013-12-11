/*
 * grunt-init-custom
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 chunterg
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a lofty project';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Start tip';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Finish tip';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'lofty'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description', 'lofty project'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name'),
  ], function(err, props) {

    props.keywords = [];
    props.npm_test = 'grunt qunit';
    props.node_version = '>= 0.8.0';
    props.devDependencies = {
        'grunt-contrib-jshint': '~0.6.0',
        'grunt-contrib-qunit': '~0.2.0',
        'grunt-contrib-less': '~0.7.0',
        'grunt-contrib-watch': '~0.4.0',
        'grunt-contrib-clean': '~0.4.0',
    }
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
