const md = require('markdown-it')()
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetchUrl = require("fetch").fetchUrl;
const path = require('path');
// para convertir a promesas metodos de node
const util = require('util');


// funcion principal que contiene todas las funciones
const mdlinks = (path) => {
  return new Promise((resolve, reject) => {
    if (path !== undefined) {
      resolve();
    } else {
      reject(console.log('Asegúrate de ingresar una ruta'))
    }
  });
}

module.exports = (path, option1, option2) => {
  mdlinks(path)
    .then(() => {
      return readPathToFile(path)
    })
    .then((readPathToFile) => {
      const allArraysLinks = readPathToFile.map((path) => {
        return linksPromise(path)
      })
      Promise.all(allArraysLinks)
        .then((results) => {
          const arrayLinks = [].concat(...results);
          const allArrayStatus = arrayLinks.map((link) => {
            return statusLinks(link)
          })
          Promise.all(allArrayStatus)
            .then((results) => {
              const arrayStatus = [].concat(...results);
              returnInformation(arrayStatus, option1, option2)
            })
        })
    })
    .catch(() => console.log('La ruta no existe, ingrésala otra vez'))
};

// primera funcion que lee la ruta o archivo .md que ingresa el usuario, devuelve array contenedor de rutas de archivos .md
const readPathToFile = (pathRequire) => {
  const pathAbsolute = path.resolve(pathRequire)
  let arrayPaths = []
  const readPath = util.promisify(fs.readdir);
  if (pathAbsolute.split('.')[1] === 'md') {
    arrayPaths[0] = pathAbsolute;
    return arrayPaths
  } else{
    return readPath(pathAbsolute).
      then((files) => {
        const arrayPathsFilter = files.filter((path) => path.split('.')[1] === 'md')
        arrayPaths = arrayPathsFilter.map((archive) => pathAbsolute + '\\' + archive)
        return arrayPaths
      })
  }
}

// segunda funcion que lee las rutas y devuelve un array de objetos con todos los links (href, text, file)

const linksPromise = (path) => {
  let arrayObjectInfo = []
  let filteredArrayObjectInfo = []
  const searchLinks = util.promisify(fs.readFile);
  return searchLinks(path)
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
      let objectInfo = {};
      arrayHyperlinks.map((a) => {
        objectInfo =
        {
          href: a.href,
          text: a.text,
          file: path
        }
        arrayObjectInfo.push(objectInfo)
      });
      //filtra los array para asegurarse que no tengan indices
      filteredArrayObjectInfo = arrayObjectInfo.filter((link) => (link.href.slice(0, 11) !== 'about:blank'))
      // console.log(filteredArrayObjectInfo)
      return filteredArrayObjectInfo
    })
    .catch((err) => console.error(err))
}

// tercera funcion que comprueba estados de los linsk y devuelve array con href, text, file, status, numberStatus
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

const statusLinks = (link) => {
  const arrayObjectInfoAll = [];
  let objectInfoAll = {};
  return fetchStatus(link.href)
    .then((response) => {
      let status = '';
      if (response.toString().slice(0, 1) <= '3') status = 'ok'
      else status = 'fail';
      objectInfoAll =
      {
        href: link.href,
        text: link.text,
        file: link.file,
        status: status,
        numberStatus: response
      }
      arrayObjectInfoAll.push(objectInfoAll)
      return arrayObjectInfoAll
    })
    .catch((err) => console.log(err))
}


// cuarta funcion que devuelve la informacion
const returnInformation = (statusLinks, option1, option2) => {
  let validate =false;
  let stats=false;
  if(option1==="--validate" && option2=== undefined) validate=true;
  else if(option1==="--stats" && option2=== undefined) stats=true;
  else if((option1==="--validate" && option2==="--stats")||(option2==="--validate" && option1==="--stats")) {validate=true; stats=true};

  if (validate===false && stats===false) {
    let objectNoOption = {};
    const arrayNoOption = statusLinks.map((links) => {
      return objectNoOption =
      {
        href: links.href,
        text: links.text,
        file: links.file
      }
    })
    return console.log(arrayNoOption)
  }
  else if (validate===true && stats===false) {
    return console.log(statusLinks)
  }
  else if (validate===false && stats===true) {
    let objectStatus = {};
    objectStatus =
    {
      Total: statusLinks.length,
      Unique: orderArray(statusLinks)
    }
    return console.table(objectStatus)

  } else if (validate===true && stats===true) {

    let broken = 0;
    for (let i = 0; i < statusLinks; i++) {
      if (arrayLinks[i].status === 'fail') broken += 1
      else broken += 0
    }
    objectStatus =
    {
      Total: statusLinks.length,
      Unique: orderArray(statusLinks),
      Broken: broken
    }
    return console.table(objectStatus)

  } else {
    return console.log('Ingresamente correctamente las opciones!')
  }
}

//ordenar el array
const orderArray = (statusLinks) => {
  const compare = (a, b) => {
    const linkA = a.href.toUpperCase();
    const linkB = b.href.toUpperCase();

    if (linkA > linkB) return 1;
    else if (linkA < linkB) return -1;
    return 0;
  }
  const arrayLinks = statusLinks.sort(compare);

  let unique = 1

  for (let i = 0; i < arrayLinks.length - 1; i++) {
    if (arrayLinks[i].href !== arrayLinks[i + 1].href) unique += 1
    else unique += 0
  }
  return unique
}

