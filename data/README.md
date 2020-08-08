# typescript-base
Este proyecto le entregara una base inicial para crear un proyecto node js con typescript como lenguaje de programación.

## Empezando 🚀 
Esta guia tiene como fin entregar al usuario el paso a paso para llevar a cabo la ejecución del proyecto typescript-base. Estas instrucciones le proporcionarán una copia del proyecto en funcionamiento en su máquina local para fines de desarrollo y prueba.

## Prerequisitos 🗒️

Para la ejecución del proyecto serán necesarias las siguientes herramientas.

``` 
  * Git
  * Node Js
  * Mongo
  * Postman
```

### Instalación ⛏️ 

Una serie de ejemplos paso a paso que le indican cómo ejecutar un entorno de desarrollo.

1. Clonar el proyecto
    ```sh
        $ git clone (https://github.com/NATALIAGJ/typescript-base.git)
    ```
2. Ir al folder typescript-base
    ```sh
        $ cd typescript-base
    ```
4. Escriba y ejecute el siguiente comando
    ```sh
        [typescript-base] $ npm install
    ```
5. Encender mongodb o ejecutar mongodb como servicio.
6. Archivos necesarios para configurar el entorno de desarrollo:
        .
        └── .env

7. Se debe crear el archivo .env y es una copia del archivo .env-example con los valores reales.
8. Compilar el typescript.
    ```sh
        [typescript-base] $  npm run build-ts
    ```

9. Para ejecutar el aplicativo en desarrollo escriba los siguientes comando.
    ```sh
        [typescript-base] $  npm run watch
    ```
## Configuración del entorno de pruebas 🛠️ 

1. La coleccion de postman se encuentra en la siguiente ruta: 
['./docs/typescript-base.postman_collection.json']

3. Crear una variable de entorno en postman, var host: http://localhost:8080/v1

# Esquema de archivos 📁

    Ditribución de alto nivel de las carpetas

    .
    ├── dist
    ├── docs
    ├── node_modules 
    ├── src
    ├── .env
    ├── .env-example
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── tsconfig.json
    └── tslint.json

    
## Construcción:  🔩⚙️

* [Express](https://expressjs.com/es/) - Framework usado
* [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación

## Versionamiento

Se uso '/v1' como versión.

## Contribuyentes 👩🏻‍🚒

* **Natalia Gonzalez** - *Dev* - [NATALIAGJ](https://github.com/NATALIAGJ)
