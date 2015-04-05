'use strict';


var config = {
  connect: {
    server: {
      options: {
        keepalive: true
      }
    }
  }
};

module.exports = function(grunt) {
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-contrib-connect');
};