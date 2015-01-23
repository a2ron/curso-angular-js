/* 
 * Aarón Rosas - aarr90@gmail.com
 */

module.exports = function(grunt)
{
    //Project configuration
    grunt.initConfig({
        jshint:{
            all:['public_html/js/js.js']
        },
        concat:{
            dist:{
                src: ['public_html/js/js.js',
                    'public_html/js/js_1.js',
                    'public_html/js/js_2.js'],
                dest:'public_html/js/unidos.js'
            }
        },  
        uglify:{
            dist:{
                src: 'public_html/js/unidos.js',
                dest:'public_html/js/unidos.min.js'
            }
        },
        shell:{
            multiple:{
                command:[
                    'rm public_html/js/unidos.js'
                ].join('&&')
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');
    //Default task.
    grunt.registerTask('default',['jshint','concat','uglify','shell']);
};