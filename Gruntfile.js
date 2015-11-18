module.exports = function(grunt) {

// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
/*
		"sass": {													// Task
			dist: {													// Target
				options: {											// Target options
					loadPath: [
						'node_modules/zurb-foundation-5/scss',
						'node_modules/font-awesome/scss'
					],
					style: 'expanded'
				},
				files: {											// Dictionary of files
					'public/css/styles.css': 'src/scss/styles.scss'
				}
			}
		},
*/
		"browserify": {
			dist: {
				files: {
					'public/js/views/customer/Form.js': ['src/js/views/customer/Form.jsx'],
					'public/js/views/customer/List.js': ['src/js/views/customer/List.jsx'],
					'public/js/views/dashboard/Index.js': ['src/js/views/dashboard/Index.jsx'],
					'public/js/views/order/Form.js': ['src/js/views/order/Form.jsx'],
					'public/js/views/order/List.js': ['src/js/views/order/List.jsx'],
					'public/js/views/product/Form.js': ['src/js/views/product/Form.jsx'],
					'public/js/views/product/List.js': ['src/js/views/product/List.jsx'],
					'public/js/views/property/Form.js': ['src/js/views/property/Form.jsx'],
					'public/js/views/property/List.js': ['src/js/views/property/List.jsx'],
					'public/js/views/supplier/Form.js': ['src/js/views/supplier/Form.jsx'],
					'public/js/views/supplier/List.js': ['src/js/views/supplier/List.jsx']
				},
				options: {
					browserifyOptions: {
						comments: true,
						compact: true,
						debug: true,
						transform: ['babelify'],
						extensions: ['.jsx']
                    }
				}
			}
		},
		watch: {
			scripts: {
				files: ['**/*.js', '**/*.jsx'],
				tasks: ['browserify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: '**/*.scss',
				tasks: ['sass'],
				options: {
					livereload: true,
				},
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');

// Default task(s).
//	grunt.registerTask('default', ['sass', 'browserify']);
	grunt.registerTask('default', ['browserify']);

};