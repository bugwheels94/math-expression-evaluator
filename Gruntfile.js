var banner='/* \n * The MIT License (MIT)\n * \n * Copyright (c) Ankit\n * \n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the "Software"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:</p>\n * \n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n * \n * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n * THE SOFTWARE.\n */';
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: { // Task
        options: { // Target options
            configFile: '.eslintrc.json'
        },
        target: ['src/lexer.js']
    },
	browserify: {
      standalone: {
        src: [ 'src/formula_evaluator.js' ],
        dest: 'dist/browser/<%= pkg.name %>.js',
        options: {
          browserifyOptions: {
            standalone: 'mexp'
          },
			banner: '/** <%= pkg.name %> version <%= pkg.version %>\n Dated:<%= grunt.template.today("yyyy-mm-dd") %> */\n'

        }
      }
    },
	uglify:{
		options: {
			banner: banner+'\n/** <%= pkg.name %> version <%= pkg.version %>\n Dated:<%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		dist: {
			src: 'dist/browser/<%= pkg.name %>.js',
			dest: 'dist/browser/<%= pkg.name %>.min.js'
		}
	},
    watch: {
        scripts: {
            files: ['src/*.js'],
            tasks: ['eslint','browserify','uglify'],
            options: {
                spawn: false,
            }
        }
    },
});

  // Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
    grunt.registerTask('default', ['watch']);
	grunt.event.on('watch', function (action, file) {
        if (/\.js/.test(file)) {
            grunt.config(['eslint', 'target'], [file]);
        }
    });

};


