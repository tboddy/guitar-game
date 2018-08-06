module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			development: {
				src: [
					'src/global.js',
					'src/controls.js',
					'src/strings.js',
					'src/tab.js',
					'src/game.js'
				],
				dest: 'game.js'
			}
		},
		watch: {
			files: ['src/*.js', 'src/*/*.js'],
			tasks: ['concat']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concat', 'watch']);
};