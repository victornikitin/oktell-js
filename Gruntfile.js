// Generated by CoffeeScript 1.6.3
module.exports = function(grunt) {
  var myConf;
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  myConf = {
    build: 'build',
    version: '1.6.0',
    chromePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
  };
  grunt.initConfig({
    myConf: myConf,
    concat: {
      build: {
        options: {
          banner: "/*\n * Oktell.js\n * version <%= myConf.version %>\n * http://js.oktell.ru/\n */\n\n"
        },
        files: [
          {
            src: ['oktell.js'],
            dest: '<%= myConf.build %>/oktell.js'
          }
        ]
      }
    },
    uglify: {
      build: {
        files: {
          '<%= myConf.build %>/oktell.min.js': ['<%= myConf.build %>/oktell.js']
        }
      }
    },
    replace: {
      build: {
        src: ['oktell.*'],
        overwrite: true,
        replacements: [
          {
            from: /self.version = '[0-9\.]+'/g,
            to: "self.version = '<%= myConf.version %>'"
          }
        ]
      },
      bower: {
        src: ['bower.json'],
        overwrite: true,
        replacements: [
          {
            from: /"version": "[0-9\.]+",/,
            to: '"version": "<%= myConf.version %>",'
          }
        ]
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      first: {
        singleRun: true,
        browsers: ['<%= myConf.chromePath %>']
      }
    }
  });
  grunt.registerTask('build', ['replace', 'concat:build', 'uglify:build']);
  return grunt.registerTask('default', ['build']);
};
