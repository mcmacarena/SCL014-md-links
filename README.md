# Markdown Links

## Índice

* [1. Introducción](#1-Introducción)
* [2. Instalación](#2-Instalación)
* [3. Dependencias](#3-Dependencias)
* [4. Uso en la terminal](#4-Uso-en-la-terminal)
* [5. Uso en la API](#3-Uso-en-la-API)

***

## 1. Introducción

Libreria que sirve para buscar y verificar todos los links que posea 1 o más archivos de extención "md".
Entrega una lista con links, status y stats.

## 2. Instalación

```sh
npm i md-links-mcmacarena
```

## 3. Dependencias

Cuenta con 3 librerias para su funcionamiento

* `fetch`
* `jsdom`
* `markdown-it`

## 4. Uso en la terminal

Ejemplos de rutas a ingresar:

* `md-links-mcmacarena ./path/path2`: Devuelve todos los links de los archivos con extensión "md"
* `md-links-mcmacarena ./path/file.md`: Devuelve todos los links del archivo

**HREF,TEXT,PATH**.

```sh
md-links-mcmacarena <ruta (absoluta o relativa)>
```

![opcion1](https://raw.githubusercontent.com/mcmacarena/SCL014-md-links/master/img/option1.png)

**VALIDATE**.

```sh
md-links-mcmacarena <ruta (absoluta o relativa)> --validate
md-links-mcmacarena <ruta (absoluta o relativa)> --v
```

![opcion2](https://raw.githubusercontent.com/mcmacarena/SCL014-md-links/master/img/option2.png)

**STATS**.

```sh
md-links-mcmacarena <ruta (absoluta o relativa)> --stats
md-links-mcmacarena <ruta (absoluta o relativa)> --s
```

![opcion3](https://raw.githubusercontent.com/mcmacarena/SCL014-md-links/master/img/option3.png)

**VALIDATE Y STATS**.

```sh
md-links-mcmacarena <ruta (absoluta o relativa)> --validate --stats
md-links-mcmacarena <ruta (absoluta o relativa)> -- v --s
```

![opcion4](https://raw.githubusercontent.com/mcmacarena/SCL014-md-links/master/img/option4.png)

## 5. Uso en la API

```sh
const mdLinks= require("md-links-macarena/md-links)
```

**HREF,TEXT,PATH**.

```sh
mdLinks("ruta")
```

![opcion1](https://raw.githubusercontent.com/mcmacarena/SCL014-md-links/master/img/option1.png)

**VALIDATE**.

```sh
mdLinks("ruta","--validate")
mdLinks("ruta","--v")
```

![opcion2](https://raw.githubusercontent.com/mcmacarena/SCL014-md-links/master/img/option2.png)

**STATS**.

```sh
mdLinks("ruta","--stats")
mdLinks("ruta","--s")
```

![opcion3](https://raw.githubusercontent.com/mcmacarena/SCL014-md-links/master/img/option3.png)

**VALIDATE Y STATS**.

```sh
mdLinks("ruta","--validate","--stats")
mdLinks("ruta","--v","--s")
```

![opcion4](https://raw.githubusercontent.com/mcmacarena/SCL014-md-links/master/img/option4.png)
