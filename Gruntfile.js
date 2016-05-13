/**
 * Created by Илья Яновой on 10.05.2016.
 */

module.exports = function (grunt) {
    //описываем конфигурацию
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //подгружаем package.json, чтобы использовать его данные

        concat: {  //описываем работу плагина конкатенации
            dist: {
                src: ['js/script1.js', 'js/script2.js'],  // какие файлы конкатенировать
                dest: 'js/script.js'  // куда класть файл, который получиться после процесса конкатенации
            }
        },

        uglify: {  //описываем работу плагина минификации js - uglify.
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' //комментарий который будет в минифицированном файле.
            },

            build: {
                src: 'js/script.js',  // какой файл минифицировать
                dest: 'js/script.min.js' // куда класть файл, который получиться после процесса минификации
            }
        },

        cssmin: { //описываем работу плагина минификации и конкатенации css.
            with_banner: {
                options: {
                    banner: '/* My minified CSS */'  //комментарий который будет в output файле.
                },

                files: {
                    'css/style.min.css' : ['css/style1.css', 'css/style2.css']   // первая строка - output файл. массив из строк, какие файлы конкатенировать и минифицировать.
                }
            }
        },

        watch: { //описываем работу плагина слежки за файлами.
            scripts: {
                files: ['src/js/*.js'],  //следить за всеми js файлами в папке src
                tasks: ['jshint', 'concat', 'uglify', 'removelogging']  //при их изменении запускать следующие задачи
            },
            css: {
                files: ['src/css/*.css'], //следить за всеми css файлами в папке src
                tasks: ['cssmin'] //при их изменении запускать следующую задачу
            }
        }
    });

    //подгружаем необходимые плагины
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');


    //регистрируем задачу
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']); //задача по умолчанию, просто grunt
};


// module.exports = function(grunt) {
//
//
//     grunt.initConfig({
//         concat: {
//             options: {
//                 separator: ';'
//             },
//             dist: {
//                 src: ['js/script1.js', 'js/script2.js'],
//                 dest: 'js/script.js'
//             }
//         }
//     });
//
//     grunt.initConfig({
//         uglify: {
//             options: {
//                 mangle: false
//             },
//             my_target: {
//                 files: {
//                     'js/script.min.js': ['js/script.js']
//                 }
//             }
//         }
//     });
// };
//
// grunt.loadNpmTasks('grunt-contrib-concat');
// grunt.loadNpmTasks('grunt-contrib-uglify');
//
// grunt.registerTask('default', ['jshint']);