const mdlinks = require('./md-links.js');
const path = require('path');

let pathRequire = process.argv[1]
pathRequire = path.resolve(pathRequire);

const option1 = process.argv[2];
const option2 = process.argv[3];

mdlinks(pathRequire,option1,option2)