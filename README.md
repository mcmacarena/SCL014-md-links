# Markdown Links

## Índice

* [1. Instalación](#1-Instalación)
* [2. Dependencias](#2-Dependencias)
* [3. Uso y opciones](#3-Uso-y-opciones)

***

## 1. Instalación

```sh
npm i md-links-mcmacarena
```

## 2. Dependencias

Cuenta con 3 librerias para su funcionamiento

* `fetch`
* `jsdom`
* `markdown-it`

## 3. Uso en la terminal

```sh
md-links-mcmacarena <ruta (absoluta o relativa)>
```

*Ejemplos:

* `md-links-mcmacarena ./path/path2`: Devuelve todos los links de los archivos con extensión "md"
* `md-links-mcmacarena ./path/file.md`: Devuelve todos los links del archivo

![opcion1]()

VALIDATE

```sh
md-links-mcmacarena <ruta (absoluta o relativa)> --validate
md-links-mcmacarena <ruta (absoluta o relativa)> --v
```

![opcion2]()

STATS

```sh
md-links-mcmacarena <ruta (absoluta o relativa)> --stats
md-links-mcmacarena <ruta (absoluta o relativa)> --s
```

![opcion3]()

VALIDATE Y STATS

```sh
md-links-mcmacarena <ruta (absoluta o relativa)> --validate --stats
md-links-mcmacarena <ruta (absoluta o relativa)> -- v --s
```

![opcion4]()

## 3. Uso API

```sh
const mdLinks= require("md-links-macarena/md-links)
```

```sh
mdLinks("ruta")
```

![opcion1]()

```sh
mdLinks("ruta","--validate")
mdLinks("ruta","--v")
```

![opcion2]()

```sh
mdLinks("ruta","--stats")
mdLinks("ruta","--s")
```

![opcion3]()

```sh
mdLinks("ruta","--validate","--stats")
mdLinks("ruta","--v","--s")
```

![opcion4]()
