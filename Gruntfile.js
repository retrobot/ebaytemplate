'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
}


module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  // Compass settings
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'sass',
          cssDir: 'css',
	        fontsDir: 'fonts',
	        javascriptDir: 'js',
          environment: 'production'
        }
      },
      dev: {                    // Another target
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },
    watch: {
	options: {
	  livereload: true,
	},
	html: {
          files: ['./app/design/frontend/**/*.{phtml,xml}','./skin/**/*.css','!node_modules/**/*.*'],
      },
    },
  // image minification settings
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
	      },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'hello',
          src: '*.{png,jpg}',
          dest: 'images'//'<%= cwd %>'
        }]
          // {src: 'hello/*.png'}
          // 'dest/fe/': ['hello/*.{png,jpg,jpeg}'],
          // dest: ['*.min.{png,jpg,jpeg}']
          // 'dest/img.png':['src/img.png'],
          // 'dest/img.jpg':['src/img.jpg'],       
      },
      dev: {
        options: {
	        optimizationLevel: 0
	      },
        files: {
          'dev/img.png': 'src/img.png',
          'dev/img.jpg': 'src/img.jpg'
        }
      }
    },
    rsync: {
      dist: {
          src: "./",
          dest: "public_html/shop",
	  host: "kiwikrea@kiwikreatives.co.uk",
	  port: "3784",
          recursive: true,
          exclude: [".git*","*.scss"]
	       // syncDest: true
      },
      "staging": {
          src: "./",
	        dest: "public_html",
          host: "kiwikrea@kiwikreatives.co.uk",
          port: "3784", // Use the rsyncwrapper port option to set a non-standard ssh port if required.
          recursive: true,
          syncDest: false
      },
      "deploy-live": {
          src: "../dist/",
          dest: "/var/www/site/blog",
          host: "kiwikrea@kiwikreatives.co.uk",
          port: "3784",
          recursive: true,
          syncDest: true
      }
  }
  });

  grunt.file.setBase('./');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-rsync');


  grunt.registerTask('deploy', ['rsync:dist']);
//  grunt.registerTask('images', ['imagemin:dist']);
  grunt.registerTask('default', ['compass:dist','watch']);
};












