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
					'public/js/views/customer/Create.js': ['src/js/views/customer/Create.jsx'],
					'public/js/views/customer/Edit.js': ['src/js/views/customer/Edit.jsx'],
					'public/js/views/customer/List.js': ['src/js/views/customer/List.jsx'],
					'public/js/views/customer/View.js': ['src/js/views/customer/View.jsx'],
					'public/js/views/order/Create.js': ['src/js/views/order/Create.jsx'],
					'public/js/views/order/Edit.js': ['src/js/views/order/Edit.jsx'],
					'public/js/views/order/List.js': ['src/js/views/order/List.jsx'],
					'public/js/views/order/View.js': ['src/js/views/order/View.jsx'],
					'public/js/views/product/Create.js': ['src/js/views/product/Create.jsx'],
					'public/js/views/product/Edit.js': ['src/js/views/product/Edit.jsx'],
					'public/js/views/product/List.js': ['src/js/views/product/List.jsx'],
					'public/js/views/product/View.js': ['src/js/views/product/View.jsx'],
					'public/js/views/supplier/Create.js': ['src/js/views/supplier/Create.jsx'],
					'public/js/views/supplier/Edit.js': ['src/js/views/supplier/Edit.jsx'],
					'public/js/views/supplier/List.js': ['src/js/views/supplier/List.jsx'],
					'public/js/views/supplier/View.js': ['src/js/views/supplier/View.jsx']
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