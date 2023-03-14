# rooms

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
CHALLENGE

OBJETIVO
Se quiere llevar un control de las salas que hay en las distintas plantas de un edificio para ver el porcentaje de ocupación y la capacidad máxima que tienen. Además, se debe poder editar esta información, así como añadir nuevas salas o eliminar las existentes.

Para desarrollarlo puedes utilizar Angular, Vue o React; con la que más cómod@ te sientas 😉

OBLIGATORIO
Listar salas de una planta seleccionada (mínimo 2 plantas a elegir)
Añadir nuevas salas a una planta
Editar la información de una sala
Readme con las siguientes secciones:
Pasos para arrancar el proyecto
Explicación de las decisiones que hayas tomado
Dificultades encontradas
 
EXTRAS
Simular la conexión con backend con una API mockeada (puedes crearla con https://apimocha.com/ u otra plataforma que conozcas)
Eliminar salas de una planta
Filtrar las salas por capacidad y ocupación
Responsive
RECURSOS
Te adjuntamos el diseño de cómo se vería el listado de salas y algunos valores para conseguir el pixel perfect:
Colores: azul oscuro (#2E344D) y azul claro (#F5F7FB)
Border-radius containers: 26px
Border-radius inputs and buttons: 12px
Fuente: Helvetica

————————————————————————————————————————————————————————————————————————
<h2>Explicación del proyecto</h2>

Buenas, para este challenge he elegido el framework vue 2 ya que es con el que más experiencia tengo.

Paso a explicar como lo tengo estructurado y las distintas decisiones que he tomado.

Para empezar he usado html básico para crear los distintos componentes (sin usar librerías estilo bootstrap, vuetify, element.io, material o alguna de estas librerías de componentes)

He usado:
<ul>
  <li>Router de vue para el enrrutamiento.</li>
<li>Axios para las peticiones al backend.</li>
<li>Libreria fontawesome para el icono del filtro.</li>
<li>Vue-click-outside para una funcionalidad de clicar fuera del contenedor de los filtros y que se oculte.</li>
<li>Pug para que sea mas legible el html con las tabulaciones y también ahorrar en lineas de código.</li>
<li>Sass para estilar los componentes.</li>
<li>Api mocha para simular la petición al backend.</li>
 </ul>

Podría haber usado Vuex, pero no lo he usado para este proyecto ya que no veía una complejidad excesiva de las relaciones de sus componentes ni tampoco es una aplicación que muchos componentes necesiten esa información.

En cuanto a la estructura, he creado varias carpetas:

<p>Views: En la cual están las vistas de la aplicación (En este caso solo tenemos una vista RoomsList)</p>
<p>Components: donde aparecen los distintos componentes que vamos a utilizar en las vistas.
En este caso he dejado el componente RoomComponent a este mismo nivel porque nada mas teníamos componentes de este contexto pero si por ejemplo hubiera distintos modulos,funcionalidades.. pues este componente iría dentro de una carpeta que se llamaría Rooms por ejemplo.

Dentro de components hay otra carpeta que se llama Shared, en la cual he metido los componentes que son reutilizables como, por ejemplo, el componente ModalComponent, el cuál he creado para las modales de añadir y actualizar sala o para el mensaje de confirmación del borrado de la sala.
El otro componente RouteView, sirve de apoyo para la redireccion que he simulado en el router.</p>

<p>Router: aqui en el fichero índex.js quedan configuradas las distintas rutas de la aplicación, con su lazy loading en los componentes, para una carga mas eficiente.</p>

<p>Services: en esta carpeta esta configurado axios en el fichero service.js en el cual si hubiera mas complejidad o tuviéramos distintos backends podríamos usar el interceptor para construir la url correcta a cada backend por ejemplo. En este fichero se encapsula todo y luego en ficheros como roomsService.js pues se configuran los distintos métodos con los endpoints que sean necesarios.
De esta forma podríamos tener distintos ficheros por cada funcionalidad o agrupación que queramos y tener de manera mas organizada el código y en el service.js toda la configuración de axios (cabeceras, interceptores, apikeys..etc)</p>

<p>Assets > styles: Dentro de esta carpeta he creado una hoja de estilos generales con los colores que me pasasteis en variables y los border radius también en variables para usarlos en todo el proyecto.
Y bueno tambien hay estilos generales de los botones aquí.</p>


He creado la pantalla a través del diseño requerido y le he añadido los botones de eliminar, y el filtro en la esquina superior derecha con los dos inputs para filtrar por capacidad y ocupación. Como no se especificaba la lógica de los filtros, he puesto que en cada uno de los inputs pongas lo máximo que quieras filtrar, es decir aparecerán los valores inferiores o iguales a ese tope que se ha introducido por pantalla.

En cuanto a dificultades, como tal no es una dificultad, pero en el día a día no suelo usar etiquetas html como tal, normalmente creamos componentes bajo alguna librería como las nombradas anteriormente de bootstrap, vuetify, element.io, alguna propia de la empresa.. 

