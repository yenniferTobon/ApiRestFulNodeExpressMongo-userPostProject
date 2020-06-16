# Prueba Practica - JULIUS

# API RESTFUL con Node.js y Express

### Descripción

En este proyecto de BackEnd se realizó la construcción de APis RESTFUL para usuarios y post. La ruta base siempre será *<host/api/rutasDescritas>*, si se va a consumir las diferentes apis desde una herramienta que simule peticiones HTTP REST, tal como postman,se debe tener en cuenta que para las rutas que tienen como prerrequisitos estar autenticadas se debe colocar en el Headers, la *<Key: Authorization>*, y dentro de esta en en campo de <value> se deberá poner el token que se obtiene cuando se inicia sesión, _*hay que recordar que este toquen tiene una vigencia de una hora*_.
Para correr el proyecto localmente se debe de crear un archivo llamado .env que tenga los siguientes nombres para las variables pero su valor se puede cambiar.

#### Archivo .env

| Nombre de la variable | valor                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------|
| PORT_BD               | Puerto por el cual se establece conexión a la BD                                        |
| NAME_BD               | Nombre de la instancia de BD                                                            |
| IP_BD                 | IP del servidor que aloja la BD                                                         |
| PORT_APP              | Puerto por el cual corre la aplicación                                                  |
| SECRET                | Clave secreta para encriptar/descifrar Token                                            |
| AWSAccessKeyId        | Llave publica de acceso a AWS. En este [link](https://stackabuse.com/uploading-files-to-aws-s3-with-node-js/) puedes consultar como obtener este campo    |
| AWSAccessKeyId        | Llave secreta de acceso a AWS. En este [link](https://stackabuse.com/uploading-files-to-aws-s3-with-node-js/) puedes consultar como obtener este campo    |
| bucketName            | Nombre del Bucket S3 que creaste en AWS. En este [link](https://stackabuse.com/uploading-files-to-aws-s3-with-node-js/) puedes consultar como crear un S3 |
| pathImage             | Ruta fisica de donde se almacenan las imágenes para subir al S3                         |

Luego de realizar la clonación del repositorio y creado el archivo de ambientes, se debe instalar los paquetes de dependencia que se requieren para la correcta ejecución del programa. Para eso se debe ejecutar el comando

```
npm install
```

## Rutas.

#### URL de las rutas creadas para el usuario.

| Rutas                           | Descripción                                                                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [/signup](0-subs.py)            | POST - Ruta para registrar usuarios, para registrase se necesita el username, email el cual debe de escribirse asi nombreDeUsuario@organizacion.tipo y la contraseña                                |
| [/signin](1-top_ten.py)         | POST - Ruta para iniciar sesion, se debe estar registrado antes de intentar iniciar sesion y se necesita el username y la contraseña en caso de que estos datos sean validos se de volvera un token |
| [/user](2-recurse.py)           | GET - Ruta para retornar todos los usuario registrados, se debe estar autenticado                                                                                                                   |
| [/user/:userId](2-recurse.py)   | GET - Ruta para retornar la información de un usuario, en la ruta se debe reemplazar :userId por el id del usuario, se debe estar autenticado                                                       |
| [/user/:usrId](2-recurse.py)    | PATCH - Ruta para modificar los datos de un usuario, en la ruta se debe reemplazar :userId por el id del usuario, se debe estar autenticado                                                         |
| [/user/:removeId](2-recurse.py) | DELETE - Ruta para eliminar un usuario, en la ruta se debe reemplazar :userId por el id del usuario, se debe estar autenticado                                                                      |

#### URL de las rutas creadas para los Post, siempre se debe estar autenticado.

| Rutas                         | Descripcion                                                                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [/post](0-subs.py)            | POST - Ruta para crear post, se necesita el title, content, image y created_at, autor estos dos ultimos datos son automaticos           |
| [/post](1-top_ten.py)         | GET - Ruta para retornar todos los post que a creado un usuario                                                                         |
| [/post/:postId](2-recurse.py) | GET - Ruta para retornar la informacion de un post, en la ruta se debe reemplazar :postId por el id del post                            |
| [/post/:postId](2-recurse.py) | DELETE - Ruta para eliminar un post, solo podra ser eliminado por su creador, en la ruta se debe reemplazar :postId por el id del post  |
| [/postSearch](2-recurse.py)   | GET - Ruta para buscar los post del creador autenticado por titulo o contenido en la ruta se debe reemplazar :postId por el id del post |

## Author

[Yennifer Tobon](https://www.linkedin.com/in/yennifertobon25/) [:octocat:](https://github.com/yenniferTobon)

[:Twitter:](https://twitter.com/TobonYennifer)

