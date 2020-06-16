# Prueba Practica - JULIUS

# API RESTFUL con Node.js y express.js

### Description

En este proyecto de BackEnd se realice la APis RESTFUL para usuarios y post, La ruta base siempre será host/api/rutasDescritas, si se va a consumir las apis desde postman para las rutas que necesiten estar autenticadas se debe colocar en el Headers, Key: Authorization, en value se pone el token que se obtiene cuando se inicia sesion, hay que recordar que este toquen tiene una vigencia de una hora.
para correr el proyecto en localmente se debe de crear un archivo llamado .env que tenga los siguientes nombres para las variables pero su valor se puede cambiar.

#### Archivo .env

| Nombre de la variable | valor                                    |
| --------------------- | ---------------------------------------- |
| PORT_BD               | 27017                                    |
| NAME_BD               | userPostApp                              |
| IP_BD                 | 127.0.0.1                                |
| PORT_APP              | 3000                                     |
| SECRET                | Qw1?Df3&Vb7%                             |
| AWSAccessKeyId        | AKIAJGQ5YFTZG4VIVXIA                     |
| AWSAccessKeyId        | khZlFag8hHhJk3pPhgF65Gc5v+sueG92ob5oZ0OB |
| bucketName            | juliusymty                               |
| pathImage             | /home/yenn25/images/                     |

## Rutas.

#### URL de las rutas creadas para el usuario.

| Rutas                           | Descripcion                                                                                                                                                                                         |
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

[Yennifer Tobon](https://www.linkedin.com/in/yennifer-tobon-yate-13716294/) [:octocat:](https://github.com/yenniferTobon)

[Twitter](https://twitter.com/TobonYennifer)
