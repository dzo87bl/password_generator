module.exports = function(grunt) {
	/* msg */
	grunt.registerTask('msg', function() {
		console.log("Message!")
	});
	/* alert */
	grunt.registerTask('alert', function() {
		console.log("Alert!")
	});
	/* both */
	grunt.registerTask('both', ['msg', 'alert']);

	/* project configuration */
	grunt.initConfig({
		concat : {
			/*options : {
				separator : ';',
			},*/
			css : {
				src : ['css/bootstrap.min.css', 'css/bootstrap-theme.min.css', 'css/jquery-ui-1.10.4.custom.min.css', 'css/style.css',],
				dest : 'build/css/style.css',
			},
			js : {
				src : ['js/jquery-1.11.3.min.js', 'js/jquery-ui-1.10.4.custom.min.js', 'js/bootstrap.min.js', 'js/app.js',],
				dest : 'build/js/script.js',
			},
		},
		watch: {
			css: {
				files: ['css/**/*.css'],
				tasks: ['concat:css'],
				/*options: {
					spawn: false,
				},*/
			},
			js: {
				files: ['js/**/*.js'],
				tasks: ['concat:js'],
			},
		},
		/*uglify: {
			my_target: {
				files: {
					'build/js/script.min.js': ['build/js/script.js']
				}
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'build/css',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css',
					ext: '.min.css'
				}]
			}
		}*/
	});
	
	/* grunt-contrib-concat */
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	/* grunt-contrib-watch */
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	/* grunt-contrib-uglify */
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	
	/* grunt-contrib-cssmin */
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	/* default */
	grunt.registerTask('default', ['concat', 'watch',]); //'uglify', 'cssmin'

};