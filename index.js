const mdlinks = require('./md-links.js');
const path = require('path');

let pathRequire = process.argv[2]
pathRequire = path.resolve(pathRequire);

mdlinks(pathRequire)