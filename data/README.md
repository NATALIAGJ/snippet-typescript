# Base typescript
Con este template base se logrará obtener una copia de un proyecto funcional en typescript, adecuado con una ruta de ejemplo, su controlador y su modelo de base de datos. La base de datos usada en el template es mongo, se entregará también una configuración inicial con variables de entorno que deberá ser adecuada según sus necesidades. 

## Tabla de contenido
1. [Comenzando](#Comenzando)
2. [Requisitos](#Requisitos)
3. [Instalación](#Instalación)
4. [Pruebas](#Ejecutando_las_pruebas)
5. [Construido](#Contruido_con)
6. [Versionado](#Versionado)
7. [Autores](#Autores)
8. [Licencia](#Licencia)

## Comenzando
Con estas instrucciones usted podra obtener una copia del proyecto logrando asi ponerlo en funcionamiento en un entorno de desarrollo.

## Requisitos

Software necesario para la instalación, ejecución y pruebas del proyecto:

``` 
  * Node Js
  * MongoDB, (Mongo debe estar en ejecución)
  * Git
  * Typescript
  * Insomnia
```

### Instalación

Guía paso a paso de la instalación del proyecto:

1. Clonar el proyecto
    ```sh
        $ git clone (https://gitlab.com/hansel-m-rojas/base.ts.git)
    ```
2. Ir al folder base.ts
    ```sh
        $ cd base.ts
    ```
4. Ejecute el comando
    ```sh
        [base.ts] $ npm install
    ```
4. Ejecute el comando, para compilar el typescript
    ```sh
        [base.ts] $ npm run tsc
    ```
4. Ejecute el comando, para poner en funcionamiento el proyecto
    ```sh
        [base.ts] $ npm run start
    ```
5. Abrir en el navegador la url http://localhost:3000/v1/ para comprobar el funcionamiento

## Ejecutando_las_pruebas
Las pruebas se podrán ejecutar desde el software insomnia, la coleccion se podra importar y se encuentra en la siguiente ruta: ['/data/Insomnia_2020-08-08.yaml]

Las pruebas las debera ejecutar el usuario desde Insomnia

## Construido_con

El proyecto ha sido construido con las siguientes herramientas de software
    * [NodeJs](https://expressjs.com/es/)
    * [Express](https://expressjs.com/es/)
    * [TypeScript](https://www.typescriptlang.org/)
    * [MongoDB](https://www.typescriptlang.org/)

## Versionado
La version usada para este template es v1

## Autores
* **Hansel M Rojas** - *Owner* - [HanselMRojas](https://github.com/HanselMRojas)

## Licencia

La licencia para este proyecto es MIT

