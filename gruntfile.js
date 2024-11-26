const { option } = require("grunt");


module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // env: {
        //     dev: {
        //       NODE_ENV: 'development',
        //     },
        //     prod: {
        //       NODE_ENV: 'production',
        //     },
        //   },
      
          // Configuração do SASS
        sass: {
            dev: {
              options: {
                implementation: require('sass'),
                style: 'expanded', // Mais legível, útil para desenvolvimento
                },
              files: {
                'dev/styles/main.css': 'src/styles/main.scss', 
                },
            },
            prod: {
              options: {
                implementation: require('sass'),
                style: 'compressed', 
                sourcemap: false,    
              },
              files: {
                'dist/styles/main.min.css': 'src/styles/main.scss', 
              },
            },
        },
        watch:{
            sass: {
                files: ['src/styles/**/main.scss'],
                tasks : ['sass:dev']
            },
            html:{
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.css',
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.min.css',
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html' : 'src/index.html'
                }
            }
        },
        clean: ['prebuild']
    })


    grunt.loadNpmTasks('grunt-sass');
    // grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-replace')
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-clean')

    grunt.registerTask('default', ['watch']),
    grunt.registerTask('build', ['sass:prod', 'htmlmin:dist', 'replace:dist', 'clean' ])
}