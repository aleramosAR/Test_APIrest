# Testeamos nuestra API Rest

> Para hacer las pruebas se debe iniciar el servidor con ```npm start``` en una terminal y ejecutar los otros scripts en una nueva.

<br />

* ##### *Realizar un test de la funcionalidad hacia la API Rest de productos (testeada con postman), esta vez creando las pruebas a través un cliente de pruebas que utilice Axios para leer productos disponibles, incorporar nuevos productos, modificar y borrar.<br /><br />Realizar el cliente en un módulo independiente y desde el código generar los requests correspondientes, revisando los resultados desde la base de datos y en la respuesta del servidor obtenida en el cliente HTTP.*
<br />

Para probar este test se debe ejecutar el script ```npn run testaxios```.<br />
Este test ejecuta los siguientes pasos llamando a la API usando la librería AXIOS.
Por medio de ```console.log()``` voy mostrando el resultado de cada paso.

* Crea 4 productos.
* Muestra el listado de productos.
* Modifica el precio del primer producto.
* Elimina el ultimo producto.
* Vuelve a mostrar el listado de productos.
* Limpia la base de datos.

<br />
<hr />
<br />

* #### *Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos. Escribir una suite de test para verificar si las respuestas a la lectura, incorporación, modificación y borrado de productos son las apropiadas.*
<br />

Para probar este test se debe ejecutar el script ```npn run test```.<br />

Usando **Mocha**, **Chai** y **Supertest** ejecuto 5 tests.

* Reinicio de base de datos (para comenzar con la base vacia)
* Creacion de un nuevo producto (POST)
* Chequeo que haya 1 producto en la base (GET)
* Modificacion en el precio del primer producto (PUT)
* Eliminacion de un item (DEL)

<br />
<hr />
<br />

* #### *Generar un reporte con los resultados obtenidos de la salida del test.*

Adjunto el archivo **reporte.pdf** con los resultados del test.