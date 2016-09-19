module.exports = function(grunt){

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      watch:{
         express:{
            files: ['server.js'],
            tasks: ['express:dev'],
            options: {
               spawn: false
            }
         },
         browserify:{
            files: ['dev/js/**/*.js'],
            tasks: ['browserify:dist'],
         },
         sass:{
            files: ['dev/scss/**/*.scss'],
            tasks: ['sass:dev'],
         },
         livereload:{
            options: {livereload:true},
            files: ['src/js/*.js','src/style/*.css']
         }
      },

      env: {
         dev: {
            NODE_ENV: 'development'
         },
         prod: {
            NODE_ENV: 'production'
         }
      },

      browserify: {
         dist:{
            options:{
               browserifyOptions: {
                  debug:true
               },
               transform: [
                  ['babelify',{presets:['es2015','react','stage-0'],plugins:['transform-decorators-legacy']}]
               ]
            },
            src: ['dev/js/index.js'],
            dest: 'src/js/grunt.js'
         }
      },

      uglify:{
         dist:{
            src: 'src/js/grunt.js',
            dest: 'src/js/grunt.min.js',
         }
      },

      sass: {
         dev: {
            options: {
               style: 'expanded'
            },
            files: {
               'src/style/main.css': 'dev/scss/style.scss'
            }
         },
         prod: {
            options: {
               style: 'compressed'
            },
            files: {
               'src/style/main.min.css': 'dev/scss/style.scss'
            }
         }
      },

      express:{
         dev:{
            options:{
               script:'server.js'
            }
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-env');
   grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-sass');
   grunt.loadNpmTasks('grunt-express-server');

   grunt.registerTask('default',['env:dev','express:dev','browserify','sass:dev','watch']);
   grunt.registerTask('build',['env:prod','browserify','sass:prod','uglify']);

};
