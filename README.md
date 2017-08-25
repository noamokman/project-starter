# project-starter [![Build Status](https://travis-ci.org/noamokman/project-starter.svg?branch=master)](https://travis-ci.org/noamokman/project-starter)
a cli tool to help you start a new project

## Installation
``` bash
$ [sudo] npm install project-starter -g
```

### Preview
See the output of this project [here](https://github.com/noamokman/project-starter-sample)

## Usage

Bootstrap a new project repository with these steps:

* Clone your repository

* run `npm init` with your preferred values (if no package json is found, will run `npm init -y` for you)

* run `project-starter` in the folder

### CLI
``` bash
$ project-starter

   project-starter 0.0.0 - a cli tool to help you start a new project
     
   USAGE

     project-starter [path]

   ARGUMENTS

     [path]      Directory to initialize      optional      default: "/path/to/cwd"

   OPTIONS

     -n, --name      Name of your project      optional      

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages    
```

### Example
``` bash
git clone https://github.com/me/my-project
cd my-project
project-starter
```

## License

[MIT](LICENSE)