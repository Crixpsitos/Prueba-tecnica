## ¿Por qué utilicé Clean Architecture?
La Clean Architecture es un enfoque de diseño de software que promueve la separación de preocupaciones y la independencia de los detalles de implementación. Al aplicar este enfoque, se busca crear un sistema que sea fácil de entender, mantener y escalar a lo largo del tiempo.
pero aveces muchas de las ocasiones no es necesario aplicar la Clean Architecture, ya que el proyecto es pequeño y no tiene muchas funcionalidades. En este caso, la Clean Architecture puede ser excesiva y complicar innecesariamente el diseño del sistema sabiendo que puede haber demasiadas carpetas.

## ¿Qué mejoraría si tuviera más tiempo?
* Mejorar la documentación del proyecto.
* Mejorar la estructura de directorios.
* Mejorar la organización de archivos.
* Mejorar la estructura de componentes.
* Mejorar la estructura de estilos de tailwindcss v4.
* mejorar el componente MoviesForm, haciendolo más leible.
* crear el custom hook para usarlo en el componente MoviesForm.
* mejorar el responsive
* seperar las rutas por diferentes componentes
* agregar un Error boundary para manejar errores en la aplicacion

## Descripción para ejecutar el proyecto localmente

1. Clona el repositorio:
    ```bash
    git clone <URL-del-repositorio>
    cd <nombre-del-repositorio>
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Ejecuta el proyecto en modo desarrollo:
    ```bash
    npm run dev
    ```

> Este proyecto utiliza **Vite** y **React 19 con TypeScript**.



# Reflexion de la prueba

Desde mi punto de vista, la prueba no fue un gran reto para mí. Sin embargo, entiendo de que claramente el tiempo si es algo que empieza a presionarlo a uno y empiezas a cometer errores
el desarrollo de la prueba es facil por que react tiene una estructura facil de entender pero no expectacular buena cuando se trata un proyecto estructurado, para eso intentamos conseguir 
una buena estructura de carpetas y archivos, para que el proyecto sea escalable y mantenible en el tiempo, hacer mas configuraciones y bibliotecas para hacer que el proyecto sea mas profesional
y obtenga funcionalidades mas avanzadas, ejemplo, tanstack query para hacer una consulta a una api y obtener los datos de una manera mas eficiente, y asi hacer cache de los datos, react router para 
rutas autenticadas y protegidas, y asi tener una mejor experiencia de usuario, hidratacion parcial, etc. cosas que frameworks como nextjs o nuxtjs ya traen por defecto, pero que en react puro no lo trae, y es por eso que se hace un poco mas complicado el desarrollo de una aplicacion web
pero no imposible, y es por eso que se hace un poco mas complicado el desarrollo de una aplicacion web pero no imposible, y es por eso que se hace un poco mas complicado el desarrollo de una aplicacion web con solamente react
el que sabe usar bien react y sus hooks, es capaz de hacer cualquier cosa, pero no es lo mismo que usar un framework como nextjs, nuxjs o angular con SSR, que ya trae todo configurado y listo para usar, y es por eso que se hace un poco mas complicado el desarrollo de una aplicacion web con solamente react.

desde mi opinion react es mucho mas util cuando utilizas bien los patrones de custom hooks, patrones de diseños, tienes herramientas que verdaderamente son utiles para peticiones a API,
cache, que te ayuden a solucionar problemas repetitivos que tiene react, como los errores boundary etc.