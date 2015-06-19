module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      dist: {
        files: {
          'public/javascript/scripts.js': ['app/javascript/libs/jquery.js', 'app/javascript/libs/angular.js', 'app/javascript/libs/angular-route.js', 'app/javascript/libs/angular-animate.js']
        }
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {
          noLineComments: true,
          sassDir: 'app/stylesheet/',
          cssDir: 'public/stylesheet/'
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'public/javascript/application.js': ['app/javascript/**/*.coffee'] // compile and concat into single file
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js'],
    },
    watch: {
      files: ['<%= jshint.files %>', 'app/javascript/**/**/*.coffee', 'app/stylesheet/**/**/*.scss'],
      tasks: ['jshint', 'coffee', 'compass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['coffee', 'compass', 'jshint', 'uglify', 'watch']);

};