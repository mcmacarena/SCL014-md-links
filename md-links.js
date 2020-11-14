const md = require('markdown-it')()
const fs = require('fs');
const { url } = require('inspector');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetchUrl = require("fetch").fetchUrl;
// PROMESA
const util = require('util');

const mdlinks = (path) => {
  return new Promise((resolve, reject) => {
    if (path !== undefined) {
      resolve();
    } else {
      reject(new Error('La ruta no existe, ingrésala otra vez'))
    }
  });
}

module.exports = (path) => {
  mdlinks(path)
    .then(() => {
      return readPathToFile(path)
    })
    .then((readPathToFile) => {
      return links(readPathToFile)
    })
    .then((links) => {
      statusLinks(links)
    })
    .catch(() => console.log('La ruta no existe, ingrésala otra vez'))
};


const links = (arrayPath) => {
  const searchLinks = util.promisify(fs.readFile);
  for (let i = 0; i < arrayPath.length; i++) {
    return searchLinks(arrayPath[i])
      .then((data) => {
        // pasar todo el archivo a un documento html 
        const file = md.render(data.toString());
        // a un html de lectura
        const dom = new JSDOM(file);
        // buscar dentro del documento todos los selectores de hipervinculos, devuelve lista de nodos
        const nodeListHyperlinks = dom.window.document.querySelectorAll('a');
        // pasar la lista de nodos a array
        const arrayHyperlinks = Array.from(nodeListHyperlinks);
        // crea un array pero directamente con los links
        const arrayObjectInfo = new Array;
        let objectInfo = new Object;
        arrayHyperlinks.map((a) => {
          objectInfo =
          {
            href: a.href,
            text: a.text,
            file: arrayPath[i]
          }
          arrayObjectInfo.push(objectInfo)
        });
        //filtra los array para asegurarse que no tengan indices
        const filteredArrayObjectInfo = arrayObjectInfo.filter((link) => (link.href.slice(0, 11) !== 'about:blank'))
        return filteredArrayObjectInfo
      })
      .catch((err) => console.error(err))
  }
}

const readPathToFile = (path) => {
  let arrayPaths = []
  const readPath = util.promisify(fs.readdir);
  if (path.split('.')[1] === 'md') {
    arrayPaths[0] = path;
    return arrayPaths
  } else {
    return readPath(path).
      then((files) => {
        const arrayPathsFilter = files.filter((path) => path.split('.')[1] === 'md')
        arrayPaths = arrayPathsFilter.map((archive) => path + '\\' + archive)
        return arrayPaths
      })
  }
}

const fetchStatus = (url) => {
  return new Promise((resolve, reject) => {
    fetchUrl(url, (error, meta) => {
      if (meta) {
        resolve(meta.status);
      } else {
        reject(error)
      }
    });
  });
};

const statusLinks = (links) => {
  const arrayObjectInfoAll = new Array;   
  return links.forEach((url) => {
    fetchStatus(url.href)
      .then((response) => {
        let status= '';
        if(response.toString().slice(0,1)==='2'||response.toString().slice(0,1)==='1'||response.toString().slice(0,1)==='3') status='ok'
        else status='fail';
        let objectInfoAll = new Object;

        objectInfoAll =
          {
            href: url.href,
            text: url.text,
            file: url.file,
            status: status, 
            numberStatus: response
          }
          arrayObjectInfoAll.push(objectInfoAll)
          return console.log(arrayObjectInfoAll)
      })
      .catch((err) => console.log(url.file, url.href, 'fail', url.text))
  })

}


  // CALLBACK
// fs.readFile('./README.md', function (err, data) {
//   if (err) {
//     return console.log(err)
//   }
//   const file = md.render(data.toString());
//   // pasar todo el archivo md a un documento html de lectura
//   const dom = new JSDOM(file);
//   // buscar dentro del documento todos los selectores de hipervinculos, devuelve lista de nodos
//   const nodeListHyperlinks = dom.window.document.querySelectorAll('a');
//   // pasar la lista de nodos a array
//   const arrayHyperlinks = Array.from(nodeListHyperlinks);
//   // crea un array pero directamente con los links
//   const arrayLinks = arrayHyperlinks.map((a) => a.href,);
//   //filtra los array para asegurarse que no tengan indices
//   const filteredArrayLinks = arrayLinks.filter((link) => (link.slice(0, 11) !== 'about:blank'))
//   console.log(arrayLinks)
// })
