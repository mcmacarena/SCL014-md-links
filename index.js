const mdlinks = require('./md-links.js');
const path = require('path');

let pathRequire = process.argv[2]
pathRequire = path.resolve(pathRequire);

const option1 = process.argv[3];
const option2 = process.argv[4];

mdlinks(pathRequire,option1,option2)